INSERT INTO bots (name, description, pairing_code) VALUES (
	'Transition bot', 
	'Allows you to link your Bitcoin and Byteball addresses for participation in Byteball distribution.', 
	'A2WMb6JEIrMhxVk+I0gIIW1vmM3ToKoLkNF8TqUV5UvX@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
	'Byte-BTC exchange', 
	'Buy or sell Bytes for BTC instantly. Advanced users can offer their price, post pending orders and see the order book.', 
	'Ar2ukVqx309sX+LoC9RVOpfATgXskt+Ser5jVr3Q2FOo@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
	'Flight delays oracle', 
	'If you bought a P2P insurance against flight delays and your flight was delayed, chat with this oracle to have it post the data about your flight. After the data is posted, you can unlock the insurance contract and sweep its funds.', 
	'AuP4ngdv0S/rok+IaW1q2D6ye72eXLl3h+CqXNXzkBXn@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
	'Sports oracle', 
	'If you have a P2P betting contract with another user and you won, chat with this oracle to have it post the data about your football match. After the data is posted, you can unlock the betting contract and sweep its funds.', 
	'Ar1O7dGgkkcABYNAbShlY2Pbx6LmUzoyRh6F14vM0vTZ@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
	'BTC oracle', 
	'This oracle posts Merkle Roots of all Bitcoin transactions in a block every time a new Bitcoin block is mined. You can use its data to P2P trade Bytes vs BTC. If you are receiving Bytes (sending bitcoins), chat with the oracle after sending your bitcoins to get the Merkle Proof of your Bitcoin transaction and unlock your bytes from the smart contract.', 
	'A7C96Bhg4Gpb2Upw/Ky/YfGG8BKe5DjTiBuJFGAX50N1@obyte.org/bb#0000'
);
/*
INSERT INTO bots (name, description, pairing_code) VALUES (
	'Rosie bot', 
	'This is an open-source conversational AI, serving Rosie (chatbot base) through Pandorabots'' API. Without modifying the code, developers can serve any other AIML-compliant chatbot.

Developer: Laurentiu-Andronache, https://github.com/Laurentiu-Andronache/byteball-chatbot-Rosie', 
	'ApOpqXbI7GpqOl3Z96QW/GSNgv04g4RcFr/xpaDmN9cg@obyte.org/bb#0000'
);
*/
INSERT INTO bots (name, description, pairing_code) VALUES (
	'Byteball Asset Manager', 
	'Asset directory and asset creation platform for Byteball. The chatbot provides a simple yet powerful interface to define and issue custom Byteball assets. Assets behave similarly to the native currency "bytes": they are transferable and exchangeable. They can represent anything that has value such as debt, shares, loyalty points, airtime minutes, commodities, other fiat or crypto currencies.

Developer: Peter Miklos, https://byteball.market', 
	'Ao2SRelXb23nTnom+KHhLIzK4nyk0WAlE3vRWk5K25Gg@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
	'Zork I game', 
	'Play one of the earliest interactive fiction computer games developed between 1977 and 1979. The game unfolds in a maze-like dungeon, where the user must battle trolls and solve puzzles in order to find twenty trophies to bring back to the house outside which the game begins.

Developer: Hyena', 
	'A/SCXz5tNuJDLuCO8PXpsfUoL7dCMBGnvSST7z0YPXjd@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
	'Slice&Dice MUD', 
	'Combining the elements of provably fair online gambling and text-based multi-user dungeons (MUDs), Slice&Dice Dungeon delivers a unique gaming experience for everyone. The player takes a role of a wandering dungeon inhabitant who delves into the cruel underground caverns with the primary goal of finding food and shelter. Doing so requires them to gamble on the Byteball tokens and to get into fights with other cave explorers as part of the endless struggle for survival.

Developer: CoinGaming.io', 
	'Aka6qIh7Cc0FsdyWM/BRzye1ftDbcme5TzE88bI43P+/@obyte.org/bb#0000'
);
INSERT INTO bots (rank, name, description, pairing_code) VALUES (
	1,
	'Flight delay insurance', 
	'Buy insurance against flight delay. You get paid if your flight is delayed more than what you specify.  The quotes are based on real stats of delays of your flight, the bot charges only 5% above the probability of delay.  Insurance is based on smart contracts, you don''t need to trust the bot.

Source code: https://github.com/byteball/flight-delays-insurance, fork and write your bot.', 
	'Ai8b8CdBxZkm6h1RVhYT7y6Scas/eNn1ccavU7dgHYqN@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
	'Poll bot', 
	'Vote in polls.  The weight of your vote is proportional to your balance.

Source code: https://github.com/byteball/poll-bot', 
	'AhMVGrYMCoeOHUaR9v/CZzTC34kScUeA4OBkRCxnWQM+@obyte.org/bb#0000'
);
/*
INSERT INTO bots (name, description, pairing_code) VALUES (
	'Blackbytes Exchange BEEB (Trustful)',
	'Instant buy and sell batches of Blackbytes 24/7. No need to find a peer anymore: the bot is the peer. Note that you are trusting the coins, as well as private histories of blackbytes, to the exchange operator.', 
	'AxV6ohKFORqIGfGqCZgjK1HlL8vBiNltcWWaI0Rc9yN+@byteball.fr/bb#0000'
);
*/
INSERT INTO bots (name, description, pairing_code) VALUES (
	'Blackbyte Exchange (Semi-trustless)',
	'Instantly exchange Blackbytes and Bytes or create your own orders in the book. It''s trustless when selling Blackbytes, meaning all users are always in control of their own Blackbytes, and trustful when buying. Need help or want to socialize? You can directly chat with many other users.', 
	'ApSicldzuDl675iiUyWdmO7pLl8MPgeuNg4qOr13EkNJ@obyte.org/bb#globalchat'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
	'Buy blackbytes (trustless)',
	'Instantly buy blackbytes for bytes. The sale is done via a conditional payment smart contract, so the seller can''t scam you.

Source code: https://github.com/byteball/conditional-token-sale, you can use it to sell your tokens.', 
	'AmXiHW7Ms4qcdmXeLW4U/ou5lv4HFnijYBGWGKfgT6bM@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
    'Betting bot (Semi-trustless)',
    'Bet on sport fixtures by taking the trustless offers immediately available. Or be the bookmaker and develop a business by proposing competitive odds for popular events.
    
Developer: papabyte.com',
    'AnpzF9nVTV5JZXzlG2fSnA+8UmjFuBdbqU+rJchz3qcN@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
    'Luckybytes Lottery (provably fair)',
    'An in app lottery in which you can play using your Byteball Bytes. There are three different game modes to participate in. Win large amounts of Bytes depending on the number of players on the principle of "the winner takes all". All games are provably fair. Each lottey comes with a game and proof hash which lets a player validate and prove the results against manipulation.
    
Developer: pxrunes, https://lucky.byte-ball.com',
    'A5X5LT9HtUewgC6Zob3oRfoICNj34d44ZCRYmXnDmqdZ@obyte.org/bb#LuckyBytes'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
    'TitanCoin ICO',
    'Invest in Titan Coin -- a new token pegged to the price of 1 kg of ilmenite concentrate. Ilmenite concentrate is the main raw material used for production of Titanium dioxide.
    
Project page and investor information: http://titan-coin.com',
    'AqXgqz9CIqi+pq9RKCVgs9wDBj+XMQdi4414XUjTFL3W@obyte.org/bb#0000'
);
/*INSERT INTO bots (name, description, pairing_code) VALUES (
    'Byteball-Altcoin Exchange Bot',
    'Exchange over 60 altcoins to Bytes, Bytes to altcoins, or altcoins to altcoins. Receive your coins as fast as the network confirms your transaction. The fee is only 0.75%.  Powered by Changelly.
    
Developer: Robert Huber, http://byteball-exchange-bot.com',
    'AiAuuTYQgLL9JBdkpfXU3pjm2RZklmObGAKYB5gJioBG@obyte.org/bb#bytExchange'
);*/
INSERT INTO bots (name, description, pairing_code) VALUES (
   'CFD Trading (Trustful)',
   'Buy or sell contract for difference and try to take advantage when the price of a crypto-currency is moving up or moving down without owning it directly.
   
Developer: papabyte.com',
   'ArUEvvn+7tq0p6CbCqJtaVTSoDzX9Iot+Zd1bA40kcVB@obyte.org/bb#0000'
);
INSERT INTO bots (rank, name, description, pairing_code) VALUES (
	2,
   'Real name attestation bot',
   'Verify your real name to get access to services that require KYC.  Attestation that proves your verification is saved on the public database, but no personal data is published without your request.  Your data is saved in your wallet and you can easily disclose it to the service that needs the data.  After first successful verification, you are reimbursed the price of the attestation and rewarded with $8.00 worth of Bytes from the distribution fund, the reward is time-locked on a smart contract for 1 year.',
   'AsYnI7C8WuXqb2aLMSr0nfpLC+u3FRSLWwkp1e9ib15Z@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
   'Fun-coins faucet',
   'This bot gives out free Tangos, Tingos, Zangos and Zingos. These tokens have zero monetary value so you can practise textcoins and smart contracts with zero risk.
   
Developer: papabyte.com',
   'A0dDO/XuMzELLq4r7F3/QMB3JOJQpbq40lAeCFdAX7yU@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
   'SilentNotary ICO',
   'SilentNotary is a digital notary that saves and certifies documents, emails, chats, and audio/video recordings.  The authenticity of these records will be ensured by posting them both to Ethereum blockchain and Byteball DAG.  The ICO is active until 15 March 2018, and you can buy SNTR tokens with Bytes, BTC, or Ether.

Website: https://silentnotary.com',
   'Aop8UNeUm4Qtu0q2frAaVwkQtQiNGKYVL8NvdQYgrR+v@obyte.org/bb#0000'
);
INSERT INTO bots (rank, name, description, pairing_code) VALUES (
	2,
   'Email attestation bot',
   'Verify your email adddress, and your payers don''t need to know your Byteball address any longer, they just write your email address as recipient.    After first successful verification, you are rewarded with $10.00 worth of Bytes from the distribution fund if your email is on one of whitelisted domains.',
   'Al+nIuRMIr8PGvi3BkIVU+S/VZ1Xm2SM3yR3z4IoyMbJ@obyte.org/bb#0000'
);
INSERT INTO bots (rank, name, description, pairing_code) VALUES (
	2,
   'Exchange Bot',
   'Exchange Byteball-issued tokens against Bytes or token vs token.  The exchange is based on smart contracts, so you don''t have to trust the exchange operator.',
   'A8GXYB3lSvSsvej+ZQgfF2prwx8gopMx8j5JwwUS9ZVD@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
   'Worldopoly ICO',
   'Worldopoly is the world’s first mobile game combining AR, AI, Geolocationing, Blockchain, and DAG. The ICO is active until 17 May 2018, and you can buy WPT tokens with Bytes, BTC, or Ether.  WPT token is issued both on Byteball and Ethereum platforms but investors on Byteball platform receive increased bonus (even if they pay in ETH or BTC) for investments up to 30 ETH.

Website: https://worldopoly.io',
   'AwyoKVsyxajATgLXa9Jhh8NBRTnUaZNHdi85c43g+GoJ@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
   'WhiteLittle Airdrop 小白币糖果机器人',
   '小白链机器人送出小白币糖果。小白链是专门为想进入区块链行业的小白们量身打造的帮助平台，其目的是建立一个基于字节雪球技术为小白们提供有效帮助的信息发现生态平台。小白链的设计初衷是构建一套合理的激励机制，能够及时得到帮助，又让提供帮助的区块链从业者得到合理的回报。

开发者：123cb.net',
   'Ahe4jkq5GvgLQ2h5ftqRMjWBBumUEN96tWoSfEQ9TGHF@obyte.org/bb#0000'
);
INSERT INTO bots (rank, name, description, pairing_code) VALUES (
	3,
   'Buy Bytes with Visa or Mastercard',
   'This bot helps to buy Bytes with Visa or Mastercard.  The payments are processed by Indacoin.  Part of the fees paid is offset by the reward you receive from the undistributed funds.',
   'A1i/ij0Na4ibEoSyEnTLBUidixtpCUtXKjgn0lFDRQwK@obyte.org/bb#0000'
);
INSERT INTO bots (rank, name, description, pairing_code) VALUES (
	2,
   'Accredited investor attestation bot',
   'If you are an accredited investor, have your accredited status verified by a licensed attorney and get access to ICOs that sell security tokens to accredited investors only.',
   'A/qkC0pkuz6ofhAX78PK2omu42VdkFRa5d+vtjLvIvz+@obyte.org/bb#0000'
);
INSERT INTO bots (rank, name, description, pairing_code) VALUES (
	3,
   'World Community Grid linking bot',
   'Donate your device’s spare computing power to help scientists solve the world’s biggest problems in health and sustainability, and earn some Bytes in the meantime.  This bot allows you to link your Byteball address and WCG account in order to receive daily rewards for your contribution to WCG computations.

WCG is an IBM sponsored project, more info at https://www.worldcommunitygrid.org',
   'A/JWTKvgJQ/gq9Ra+TCGbvff23zqJ9Ec3Bp0XHxyZOaJ@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
   'Exchange bot for dual-chain tokens',
   'For tokens issued both on Byteball and Ethereum platforms, the bot enables seamless exchange between Byteball and Ethereum tokens.

Developer: HDRProtocol, https://github.com/HDRProtocol/exchanger',
   'A+dAU2j/Tm9lnlmc2SryltsfVzOq9GLPxccAq+dClCxr@obyte.org/bb#f7b42a61a3ba6a34cbeeb18d37979927ad1103fc'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
   'Private chat room bot',
   'This chatbot allows several persons to chat together using the Byteball messaging system. The bot decrypts messages and relays them to other users after reencryption. For best privacy, run your own instance of this bot using the source code below, any cheap VPS is enough to host it.

Developer: Papabyte, https://github.com/Papabyte/Private-chat-room',
   'AuB9N1V8OOdc9M5JrpNOCqI3LAcLWetitkT3MqK/Ij5U@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
   'Aworker ICO',
   'Aworker is a decentralized next-generation recruitment platform. Aworker reinvents Human Resources processes via referrals and smart contracts. The search for employees powered by smart contracts reduces “cost per hire” up to 4 times.

Website: https://www.aworker.io',
   'AvGhQmEMSdS4FSBnUOR/L9EhMjQQb83q/WGLjC9ChWYe@obyte.org/bb#0000'
);
INSERT INTO bots (rank, name, description, pairing_code) VALUES (
	2,
   'Steem attestation bot',
   'Verify your Steem username, and your payers don''t need to know your Byteball address any longer, they just write steem/username as recipient.  After first successful verification, you get a reward in Bytes, the amount depends on your Steem reputation.  Other apps offer discounts or bonuses to users with high reputation.  These apps include: ICOs, Real name attestation bot, Buy Bytes with Visa or Mastercard bot.',
   'A7SqDnEgwYOEhPDtJDZUVS4YtBfDwe42DVKGWaOX7pUA@obyte.org/bb#0000'
);
INSERT INTO bots (rank, name, description, pairing_code) VALUES (
	3,
   'Username registration bot',
   'Buy a username and receive money to your @username instead of a less user-friendly cryptocurrency address.

Proceeds from the sale of usernames go to Byteball community fund and help fund the development and promotion of the platform.',
   'A52nAAlO05BLIfuoZk6ZrW5GjJYvB6XHlCxZBJjpax3c@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
   'Nousplatform ICO',
   'Nousplatform is a decentralized next-gen investment ecosystem. Nousplatform is set to disrupt the traditional AuM market with the introduction of smart contracts and blockchain technology. The platform empowers everyone with simple and efficient access to the investment world. Discounts apply for Byteball and Steem users.

Website: https://nousplatform.com',
   'A6K87dFpPsYgLH3S+5ekN6/OUiLCAE1JyE7bgcMcQYR3@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
   'Whitelittle reward chat room',
   'Whitelittle is a chat room for newcomer who want to enter the blockchain industry. The purpose is to bulid an information discovery ecological platform that provides effective help for newcomer based on the byteball technology. Here you can chat and help others without being censored and get some rewards.',
   'A0DQNw3dCVSOdBhDFYShaf4ZY107Tfk9H7b7LndtXAVc@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
   'Dice bot',
   'A very simple, and provably fair, dice game.

Developer: Evgeny Stulnikov',
   'AoytQbCrauzJ7q9iP9OxvgXIaEtbtlgWYSdyVy6cxHC6@obyte.org/bb#play'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
   'ClearCost ICO: booking hotels at cost price',
   'Clearcost.Club books accommodations in hotels worldwide cheaper than the lowest market price by 5% to 15% and more. ClearCost = Cost price + membership fee. The membership fee in CCWT tokens is about four times less than in USD, and this ratio will grow. CCWT are unique tokens with the economic justification for the price. Our ITO is active until October 31, 2018.

Website: https://clearcost.io',
   'AohcgBmUWV729vYhvzzxoE9Au+egHEN0APGy1D+vOY2T@obyte.org/bb#0000'
);
INSERT INTO bots (rank, name, description, pairing_code) VALUES (
	3,
   'Draw Airdrop',
   'Get a chance to win a weekly prize just by linking your existing balance.  The greater is your balance, the greater is your chance to win.  No payment is required!  The prizes are paid from the undistributed funds.

If you refer new users to the draw and one of them wins, you also win.',
   'A2WMb6JEIrMhxVk+I0gIIW1vmM3ToKoLkNF8TqUV5UvX@obyte.org/bb#0000'
);
INSERT INTO bots (name, description, pairing_code) VALUES (
   'Know-it-all Bot',
   'This bot is all about user participation and giving gratitude using incentivized Q&A.  Users pose questions and add reward with bytes for faster replies, better answers and more importantly to give thanks to participants.  Bring in experts on any social platform using a simple link, vote for the right answer and both of you can get rewarded!

This bot was first developed for Byteball Bot War in December 2018.

Developer: Terence Lee, https://github.com/whoisterencelee/know-it-all-bot',
   'Ai9tK3w0yQNvbR8kpQU5uOLRloQQXdFXJFFNZkdQN8fr@obyte.org/bb#0000'
);
