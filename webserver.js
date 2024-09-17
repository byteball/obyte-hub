const express = require('express');
const cors = require('cors');
const network = require('ocore/network.js');

var conf = require('./conf');

const allowed_methods = [
  "light/get_definition_for_address",
  "light/get_aa_state_vars",
  "light/get_aa_balances",
  "light/execute_getter",
  "light/dry_run_aa",
  "light/get_aas_by_base_aas",
  "light/get_aa_responses",
  "light/get_aa_response_chain",
  "light/get_definition_chash",
  "light/pick_divisible_coins_for_amount",
  "light/get_attestations",
  "light/get_attestation",
  "light/get_parents_and_last_ball_and_witness_list_unit",
  "light/get_history",
  "light/get_data_feed",
  "light/get_definition",
  "light/get_profile_units",
  "light/get_balances",
  "get_witnesses",
  "get_peers",
  "get_joint",
  "get_last_mci",
  "get_system_vars",
  "get_system_var_votes",
];

const methods_without_params = [
  "get_last_mci",
  "get_witnesses",
  "get_peers",
  "get_system_vars",
  "get_system_var_votes",
];

async function startWebserver() {
  const app = express();
  const server = require('http').Server(app);

  app.use(cors());
  app.use(express.json())

  app.post('*', async function (request, response) {
    let params = request.body;

    const path = request.path.replace("/", "");

    const method = allowed_methods.find(m => m === path || m === `light/${path}`);

    if (!method)
      return response.status(405).send({ error: `method is not found: ${path}` });

    if (!methods_without_params.includes(method) && (typeof params !== 'object' || Object.keys(params).length === 0)) return response.send({ error: "Not valid params" }, 400);

    params = Object.assign({}, params);

    // parameter mutation
    if (method === "light/get_profile_units") {
      params = params.addresses;
    } else if (method === "light/get_definition") {
      params = params.address;
    } else if (method === "light/get_balances") {
      params = params.addresses;
    } else if (method === "get_joint") {
      params = params.unit;
    } else if (methods_without_params.includes(method)) {
      params = undefined;
    }

    try {
      let ws = {
        assocPendingRequests: {},
        assocCommandsInPreparingResponse: {},
        peer: "local",
        readyState: 1,
        OPEN: 1,
        send: function (msg) {
          try {
            const [type, message] = JSON.parse(msg);

            if (type === "response") {
              const responseIsObject = typeof message.response === "object" && !!message.response;
              
              if (!(responseIsObject && ("error" in message.response)) && !(responseIsObject && ("joint_not_found" in message.response))) {
                return response.status(200).send({ data: message.response || null });
              } else {
                let error = "unknown error";

                if ("error" in message.response) {
                  error = message.response.error;
                } else if ("joint_not_found" in message.response) {
                  error = "joint not found"
                }

                return response.status(400).send({ error });
              }
            } else {
              return response.status(500).send({ error: "unknown request type" });
            }
          } catch {
            console.error("can't parse messages");
            return response.status(500).send({ error: "message parse error" });
          }
        }
      }

      network.handleRequest(ws, "local", method, params);

    } catch (e) {
      return response.status(500).send({ error: e });
    }
  });

  server.listen(conf.webServerPort, () => {
    console.log(`== server started listening on ${conf.webServerPort} port`);
  });
}

module.exports = startWebserver;
