// Should turn this into an Object of Objects instead with key being things like eoslimit:, txlimit:, etc
export default [
	{
		text: "Spending Limit",
		add: "addeoslimit",
		remove: "rmeoslimit",
		firstParam: "quantity",
		firstParamType: "number",
		secondParam: "days",
		secondParamType: "number",
		icon: "dollarCircle.png",
		description:
			"Set a limit on how much EOS can be sent over a period of time."
	},
	{
		text: "Number of Transactions",
		add: "addtxlimit",
		remove: "rmtxlimit",
		firstParam: "tx_limit",
		firstParamType: "number",
		secondParam: "days",
		secondParamType: "number",
		icon: "clock.png",
		description:
			"Set a limit on how many transactions can occur over a period of time."
	},
	{
		text: "Whitelisted Accounts",
		add: "addwhitelist",
		remove: "rmwhitelist",
		firstParam: "account_to_whitelist",
		firstParamType: "string",
		icon: "checklist.png",
		description:
			"Create a list of approved 'whitelist' accounts.  Transactions with any accounts not on this list will fail."
	},
	{
		text: "Blacklisted Accounts",
		add: "addblacklist",
		remove: "rmblacklist",
		firstParam: "account_to_blacklist",
		firstParamType: "string",
		icon: "checklist.png",
		description:
			"Create a list of denied 'blacklist' accounts.  Any transactions with accounts on this list will fail."
	},
	{
		text: "Tokens per Transaction",
		add: "addtknlimit",
		remove: "rmtknlimit",
		firstParam: "quantity",
		firstParamType: "number",
		icon: "dollarStack.png",
		description:
			"Set a maximum amount of tokens that can be sent per transaction."
	}
	// {
	// 	text: "Balance Notifications",
	// 	icon: "dollarStack.png",
	// 	description: "Receive notifications if any of th."
	// }
];
