import React, { Component } from "react";
import styles from "./styles";
import ToolCard from "../../components/ToolCard";

import toolOptions from "../../options/toolOptions";
import { Typography, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

class Tools extends Component {
	constructor(props) {
		super(props);
		this.state = { pageView: 1, accountInfo: null };
	}

	componentDidUpdate(props) {
		if (this.props != props) {
			this.getAccountInfo();
		}
	}

	async handleFormEvent(event) {
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
	}

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

	render() {
		const { pageView, accountInfo } = this.state;
		const accountBalance = accountInfo
			? accountInfo.core_liquid_balance.split(" ")[0] * 1
			: 0;
		const total = accountInfo
			? `${(
					accountBalance +
					accountInfo.cpu_weight / 10000 +
					accountInfo.net_weight / 10000
			  ).toFixed(4)} EOS`
			: null;
		return (
			<div style={styles.rulesContainer}>
				{pageView === 1 && (
					<div style={styles.contentContainer}>
						<div style={styles.contentTitle}>Select a tool</div>
						<Typography
							variant="body1"
							style={styles.stepText}
							component="h3"
						>
							STEP 1 OF 3
						</Typography>
						{accountInfo && (
							<div style={styles.infoContent}>
								<div style={styles.leftWrapper}>
									<div style={styles.leftItemWrapper}>
										<Typography
											variant="subheading"
											component="h2"
										>
											Available:
										</Typography>
										<Typography
											variant="subheading"
											component="h2"
										>
											{accountInfo.core_liquid_balance}
										</Typography>
									</div>
									<div style={styles.leftItemWrapper}>
										<Typography
											variant="subheading"
											component="h2"
										>
											CPU Staked:
										</Typography>
										<Typography
											variant="subheading"
											component="h2"
										>
											{(
												accountInfo.cpu_weight / 10000
											).toFixed(4)}{" "}
											EOS
										</Typography>
									</div>
									<div style={styles.leftItemWrapper}>
										<Typography
											variant="subheading"
											component="h2"
										>
											Net Staked:
										</Typography>
										<Typography
											variant="subheading"
											component="h2"
										>
											{(
												accountInfo.net_weight / 10000
											).toFixed(4)}{" "}
											EOS
										</Typography>
									</div>
									<div style={styles.leftSummaryWrapper}>
										<Typography
											variant="subheading"
											component="h2"
										>
											Total:
										</Typography>
										<Typography
											variant="subheading"
											component="h2"
										>
											{total}
										</Typography>
									</div>
								</div>
								<div style={styles.rightWrapper}>
									<Typography
										variant="subheading"
										component="h2"
									>
										RAM
									</Typography>
								</div>
							</div>
						)}
						<div style={styles.ruleCardsContainer}>
							{toolOptions.map((item, index) => {
								return (
									<button
										style={styles.buttonWrapper}
										onClick={() => this.selectRule(index)}
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
					</div>
				)}
			</div>
		);
	}
}

export default withStyles(styles)(Tools);
