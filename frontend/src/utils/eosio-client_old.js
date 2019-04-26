// DON"T USE
import React from "react";
import { initAccessContext } from "eos-transit";
import scatter from "eos-transit-scatter-provider";

const network = {
	blockchain: "eos",
	protocol: "https",
	// host: "dev.cryptolions.io",
	host: "jungle2.cryptolions.io",
	host: "api.jungle.alohaeos.com",
	port: 443,
	// port: 80,
	// chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906" // EOS Main Net
	chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473" // Jungle2
};

class EOSIOClient extends React.Component {
	constructor(props) {
		super(props);

		this.accessContext = initAccessContext({
			appName: "chestnut_frontend",
			network,
			walletProviders: [scatter()]
		});

		// There is only going to be one of these right now - Scatter.  Can add other wallet providers here and let user pick one.
		this.walletProviders = this.accessContext.getWalletProviders();
		const provider = this.walletProviders[0];
		// When user selects the wallet provider, we initiate the `Wallet` with it:
		this.wallet = this.accessContext.initWallet(provider);

		// Track when wallet is performing an action.  Good for adding UI elements later.
		this.wallet.subscribe(walletState => {
			// console.log(`wallet ${this.wallet._instanceId} state updated`);
		});

		// Now we have an instance of `wallet` that is tracked by our `accessContext`.
		// Lets connect to it and authenticate (you need Scatter app running)
		this.wallet.connect();
	}

	login = async cb => {
		// const provider = providerIndex ? this.walletProviders[providerIndex] : this.walletProviders[0];

		console.log(this.wallet);

		if (this.wallet.connected) {
			// Now that we are connected, lets authenticate (in case of a Scatter app,
			// it does it right after connection, so this is more for the state tracking
			// and for WAL to fetch the EOS account data for us)
			await this.wallet.login();
			cb(this.wallet.accountInfo);
			console.log("Authenticated with", this.wallet.auth);
			console.log("Account info", this.wallet.accountInfo);
			// Can also re-pull account info manually with wallet.fetchAccountInfo()
		} else {
			console.log("Error connecting to wallet.");
		}
	};

	chestnutTransaction = (action, data) => {
		return this.wallet.eosApi.transact(
			{
				actions: [
					{
						account: this.wallet.accountInfo.account_name,
						name: action,
						authorization: [
							{
								actor: this.wallet.accountInfo.account_name,
								permission: "owner"
							}
						],
						data: {
							...data
						}
					}
				]
			},
			{
				blocksBehind: 3,
				expireSeconds: 30
			}
		);
	};

	removeSmartAccount = async () => {};

	makeSmartAccount = async () => {
		const { accountName, permission, publicKey } = this.wallet.auth;
		console.log(accountName);
		const result = await this.wallet.eosApi.transact(
			{
				actions: [
					// Create @chestnut permission for account
					{
						account: "eosio",
						name: "updateauth",
						authorization: [
							{
								actor: accountName,
								permission: permission
							}
						],
						data: {
							account: accountName,
							permission: "chestnut",
							parent: "owner",
							auth: {
								threshold: 1,
								keys: [
									{
										key: publicKey,
										weight: 1
									}
								],
								accounts: [],
								waits: []
							}
						}
					},
					// Create the multisig active permission with `chestnutmsig@security` and `account@chestnut`
					{
						account: "eosio",
						name: "updateauth",
						authorization: [
							{
								actor: accountName,
								permission
							}
						],
						data: {
							account: accountName,
							permission: "active",
							parent: "owner",
							auth: {
								threshold: 2,
								keys: [],
								accounts: [
									{
										permission: {
											actor: "chestnutmsig",
											permission: "security"
										},
										weight: 1
									},
									{
										permission: {
											actor: accountName,
											permission: "chestnut"
										},
										weight: 1
									}
								],
								waits: []
							}
						}
					},
					// # linkauth of the @chestnut permisssion to `eosio.msig`
					{
						account: "eosio",
						name: "linkauth",
						authorization: [
							{
								actor: accountName,
								permission: permission
							}
						],
						data: {
							account: accountName,
							code: "eosio.msig",
							type: "propose",
							requirement: "chestnut"
						}
					},
					// # linkauth of the @chestnut permission to `eosio.msig` part 2
					{
						account: "eosio",
						name: "linkauth",
						authorization: [
							{
								actor: accountName,
								permission: permission
							}
						],
						data: {
							account: accountName,
							code: "eosio.msig",
							type: "approve",
							requirement: "chestnut"
						}
					},
					// # linkauth of the @chestnut permission to the actions on our smart contract
					{
						account: "eosio",
						name: "linkauth",
						authorization: [
							{
								actor: accountName,
								permission: permission
							}
						],
						data: {
							account: accountName,
							code: "chestnutmsig",
							type: "",
							requirement: "chestnut"
						}
					},
					// # update @owner permission with no trusted recovery with friends
					{
						account: "eosio",
						name: "updateauth",
						authorization: [
							{
								actor: accountName,
								permission: permission
							}
						],
						data: {
							account: accountName,
							permission: "owner",
							parent: "",
							auth: {
								threshold: 2,
								keys: [],
								accounts: [
									{
										permission: {
											actor: "chestnutmsig",
											permission: "security"
										},
										weight: 1
									},
									{
										permission: {
											actor: accountName,
											permission: "chestnut"
										},
										weight: 1
									}
								],
								waits: []
							}
						}
					}
				]
			},
			{
				blocksBehind: 3,
				expireSeconds: 30,
				broadcast: true
			}
		);
		return result;
	};

	getTable = async data => {
		const result = await this.wallet.eosApi.getTableRows(data);
		return result;
	};
}

export default EOSIOClient;
