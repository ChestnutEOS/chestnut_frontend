export default [
	{
		text: "Transfer Tokens",
		icon: "dollarCircle.png",
		type: "transfer",
		description: "Send EOS to another account",
		inputLabels: ["Receiver", "amount", "memo (optional)"],
		adornments: [null, "EOS", null],
		tooltips: ["The account you're sending EOS to", null, null]
	},
	// {
	// 	text: "Create Account",
	// 	icon: "checklist.png",
	// 	type: "create",
	// 	description: "Create a brand new EOS account"
	// },
	{
		text: "Buy RAM with EOS",
		icon: "dollarStack.png",
		type: "buyram",

		description:
			"RAM is used to store application state in memory.  You really only need it if you're building a Dapp.  RAM pricing fluctuates with market supply/demand.",
		inputLabels: ["RAM receiver", "Amount of RAM to buy"],
		adornments: [null, "bytes"]
	},
	{
		text: "Sell RAM for EOS",
		icon: "dollarStack.png",
		type: "sellram",
		description:
			"RAM is used to store application state in memory.  You really only need it if you're building a Dapp.  RAM pricing fluctuates with market supply/demand.",
		inputLabels: ["Amount of RAM to sell"],
		adornments: ["bytes"]
	},
	{
		text: "Stake CPU/Net",
		type: "stakeCpuNet",
		icon: "clock.png",
		description:
			"Stake EOS tokens for CPU and Net.  Unstaking returns these tokens to your available balance.  CPU bandwidth 'pays' for the amount of time a transaction takes.  Transaction time comes off of your allocation, and then regenerates over time.  Net bandwidth 'pays' for utilization of the network's capacity.  Just like with CPU, this transaction data comes off of your allocation, and then regenerates over time.",
		inputLabels: [
			"Receiver of Stake",
			"Amount of CPU to stake",
			"Amount of NET to stake"
		],
		adornments: [null, "EOS", "EOS"]
	},
	{
		text: "Unstake CPU/Net",
		type: "unstakeCpuNet",
		icon: "clock.png",
		description:
			"Stake EOS tokens for CPU and Net.  Unstaking returns these tokens to your available balance.  CPU bandwidth 'pays' for the amount of time a transaction takes.  Transaction time comes off of your allocation, and then regenerates over time.  Net bandwidth 'pays' for utilization of the network's capacity.  Just like with CPU, this transaction data comes off of your allocation, and then regenerates over time.",
		inputLabels: [
			"Account name of who currently holds stake",
			"Amount of CPU to unstake",
			"Amount of NET to unstake"
		],
		adornments: [null, "EOS", "EOS"]
	}
];
