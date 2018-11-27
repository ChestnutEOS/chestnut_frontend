import React, { Component } from "react";
import styles from "./styles";
import ToolCard from "../../components/ToolCard";

import toolOptions from "../../options/toolOptions";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

class Tools extends Component {
	constructor(props) {
		super(props);
		this.state = { pageView: 1 };
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
		eosio.rpc.get_account(accountName).then(result => {
			console.log(result);
		});
	};

	render() {
		const { pageView } = this.state;
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
