import React, { Component } from "react";
import styles from "./styles";
import AccountInfo from "./AccountInfo";

import ToolCard from "../../components/ToolCard";
import ToolInput from "../../components/ToolInput";

import toolOptions from "../../options/toolOptions";
import { Typography, Paper, LinearProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

class Tools extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageView: 1,
			accountInfo: null,
			selectedToolIndex: null,
			result: null
		};
	}

	componentDidUpdate(props) {
		if (this.props != props) {
			this.getAccountInfo();
		}
	}

	// async handleFormEvent(event) {
	// event.preventDefault();
	// let account = accounts[0].name;
	// let privateKey = accounts[0].privateKey;
	// let spend_max = event.target.spend_max.value;
	// let trans_max = event.target.trans_max.value;
	// let actionName = "";
	// let actionData = {};
	// switch (event.type) {
	// 	case "submit":
	// 		actionName = "update";
	// 		actionData = {
	// 			_user: account,
	// 			_spend_max: spend_max,
	// 			_trans_max: trans_max
	// 		};
	// 		break;
	// 	default:
	// 		return;
	// }
	// }

	componentDidMount() {
		this.getAccountInfo();
	}

	valueChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	getAccountInfo = () => {
		const { eosio, account } = this.props;
		if (!account || !eosio) return;
		let accountName = account.name;
		eosio.rpc.get_account(accountName).then(accountInfo => {
			console.log(accountInfo);
			this.setState({ accountInfo });
		});
	};

	selectTool = selectedToolIndex => {
		this.setState({ selectedToolIndex });
	};

	onSubmit = async inputs => {
		const { account, eosio } = this.props;
		const result = await eosio.tokenTransfer({
			to: inputs[0],
			quantity: `${(inputs[1] * 1).toFixed(4)} EOS`,
			memo: inputs[2]
		});
		console.log(result);
	};

	goBack = () => {
		this.setState({ selectedToolIndex: null });
	};

	render() {
		const { pageView, accountInfo, selectedToolIndex } = this.state;

		return (
			<div style={styles.rulesContainer}>
				{pageView === 1 && (
					<div style={styles.contentContainer}>
						<div style={styles.contentTitle}>Select a tool</div>
						{accountInfo && (
							<AccountInfo accountInfo={accountInfo} />
						)}
						{!selectedToolIndex && selectedToolIndex != 0 ? (
							<div style={styles.ruleCardsContainer}>
								{toolOptions.map((item, index) => {
									return (
										<button
											style={styles.buttonWrapper}
											onClick={() =>
												this.selectTool(index)
											}
											key={index}
										>
											<ToolCard
												text={item.text}
												icon={item.icon}
												description={item.description}
											/>
										</button>
									);
								})}
							</div>
						) : (
							<div>
								<ToolInput
									onSubmit={this.onSubmit}
									selectedToolIndex={selectedToolIndex}
									goBack={this.goBack}
								/>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

export default withStyles(styles)(Tools);
