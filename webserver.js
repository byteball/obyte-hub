const express = require('express');
const cors = require('cors');
const network = require('ocore/network.js');

var conf = require('./conf');

const allowed_light_methods = [
  "get_definition_for_address",
  "get_aa_state_vars",
  "get_aa_balances",
  "execute_getter",
  "dry_run_aa",
  "get_aas_by_base_aas",
  "get_aa_responses",
  "get_aa_response_chain",
  "get_definition_chash",
  "pick_divisible_coins_for_amount",
  "get_attestations",
  "get_attestation",
  "get_parents_and_last_ball_and_witness_list_unit",
  "get_history",
  "get_data_feed",
  "get_definition",
  "get_profile_units",
  "get_balances",
];

const allowed_not_light_methods = [
  "get_witnesses",
  "get_peers",
  "get_joint",
  "get_last_mci",
]

const methods_without_params = [
  "get_last_mci",
  "get_witnesses",
  "get_peers",
]

async function startWebserver() {
  const app = express();
  const server = require('http').Server(app);

  app.use(cors());
  app.use(express.json())

  app.post('*', async function (request, response) {
    let params = request.body;

    const method = request.path.replace("/", "");

    if (!methods_without_params.includes(method) && (typeof params !== 'object' || Object.keys(params).length === 0)) return response.send({ error: "Not valid params" }, 400);

    params = Object.assign({}, params);

    if (!(allowed_light_methods.includes(method) || allowed_not_light_methods.includes(method)))
      return response.send({ error: `method is not found: ${method}` }, 405);

    // parameter mutation
    if (method === "get_profile_units") {
      params = params.addresses;
    } else if (method === "get_definition") {
      params = params.address;
    } else if (method === "get_balances") {
      params = params.addresses;
    } else if (method === "get_joint") {
      params = params.unit;
    } else if (methods_without_params.includes(method)) {
      params = undefined;
    }

    try {
      ws = {
        assocPendingRequests: {},
        assocCommandsInPreparingResponse: {},
        peer: "local",
        readyState: 1,
        OPEN: 1,
        send: function (msg) {
          try {
            const [type, message] = JSON.parse(msg);

            if (type === "response") {
              if (!("error" in message.response)) {
                return response.status(200).send({ data: message.response || null });
              } else {
                return response.status(400).send({ error: message.response.error });
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

      network.handleRequest(ws, "local", `${allowed_light_methods.includes(method) ? "light/" : ""}${method}`, params)

    } catch (e) {
      return response.status(500).send({ error: e });
    }
  });

  server.listen(conf.webServerPort, () => {
    console.log(`== server started listening on ${conf.webServerPort} port`);
  });
}

module.exports = startWebserver;