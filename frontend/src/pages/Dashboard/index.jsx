import React, { Component } from "react";
import Eos from "eosjs"; // https://github.com/EOSIO/eosjs

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";

import Preferences from "../Preferences";
import Header from "../../components/Header";
import RuleCard from "../../components/RuleCard";

import styles from "./styles";
import accounts from "../../accounts";

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageView: 0,
			spend_max: "",
			per_period: "month"
		};
	}

	goBack = () => {
		this.setState({ pageView: this.state.pageView - 1 });
	};

	goForward = () => {
		this.setState({ pageView: this.state.pageView + 1 });
	};

	selectRule = () => {
		this.setState({ pageView: this.state.pageView + 1 });
	};

	valueChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	setParameter = async event => {
		event.preventDefault();
		let account = accounts[0].name;
		let privateKey = accounts[0].privateKey;
		let spend_max = this.state.spend_max;
		let trans_max = 0;

		let actionName = "";
		let actionData = {};

		// switch (event.type) {
		// 	case "submit":
		actionName = "update";
		actionData = {
			_user: account,
			_spend_max: spend_max,
			_trans_max: trans_max
		};
		// break;
		// 	default:
		// 		return;
		// }

		const eos = Eos({ keyProvider: privateKey });
		const result = await eos.transaction({
			actions: [
				{
					account: "seclogacc",
					name: actionName,
					authorization: [
						{
							actor: account,
							permission: "active"
						}
					],
					data: actionData
				}
			]
		});

		console.log(result);
		this.goForward();

		// this.getTable();
	};

	render() {
		const { pageView, spend_max, per_period } = this.state;
		return (
			<div>
				<Header
					userName={accounts[0].name}
					userKey={accounts[0].publicKey}
				/>

				{pageView === 0 && (
					<div style={styles.contentContainer}>
						<div style={styles.contentTitle}>
							Ready to Create Your First Rule?
						</div>
						<Button
							color="secondary"
							variant="contained"
							size="large"
							style={styles.orangeButton}
							onClick={this.goForward}
						>
							Get Started
						</Button>
						<Typography
							color="secondary"
							variant="body1"
							component="h2"
						>
							what is a rule?
						</Typography>
					</div>
				)}

				{pageView === 1 && (
					<div style={styles.contentContainer}>
						<div style={styles.contentTitle}>Select a Rule</div>
						<Typography
							variant="body1"
							style={styles.stepText}
							component="h2"
						>
							Step {pageView} of 3
						</Typography>
						<div style={styles.ruleCardsContainer}>
							<button
								style={styles.buttonWrapper}
								onClick={this.selectRule}
							>
								<RuleCard
									text="Spending Limit"
									icon="dollarCircle.png"
								/>
							</button>
							<button
								style={styles.buttonWrapper}
								onClick={this.selectRule}
							>
								<RuleCard
									text="Number of Transactions"
									icon="clock.png"
									onClick={this.selectRule}
								/>
							</button>
							<button
								style={styles.buttonWrapper}
								onClick={this.selectRule}
							>
								<RuleCard
									text="Whitelisted Accounts"
									icon="calendar.png"
									onClick={this.selectRule}
								/>
							</button>
							<button
								style={styles.buttonWrapper}
								onClick={this.selectRule}
							>
								<RuleCard
									text="Balance Notifications"
									icon="dollarStack.png"
									onClick={this.selectRule}
								/>
							</button>
						</div>
					</div>
				)}

				{pageView === 2 && (
					<div style={styles.contentContainer}>
						<div style={styles.contentTitle}>Set Parameters</div>
						<Typography
							variant="body1"
							style={styles.stepText}
							component="h2"
						>
							Step {pageView} of 3
						</Typography>
						<Typography
							variant="subheading"
							style={styles.parameterHeading}
							component="h2"
						>
							Spending Limit
						</Typography>
						<div style={styles.inputContainer}>
							<FormControl style={styles.formControl}>
								<Input
									name="spend_max"
									type="number"
									onChange={this.valueChange}
									value={spend_max}
									startAdornment={
										<InputAdornment position="start">
											EOS
										</InputAdornment>
									}
								/>
							</FormControl>
							<FormControl style={styles.formControl}>
								<Select
									value={per_period}
									onChange={this.valueChange}
									inputProps={{
										name: "per_period",
										id: "per_period",
										style: { textAlign: "center" }
									}}
								>
									<MenuItem value={"day"}>Per Day</MenuItem>
									<MenuItem value={"month"}>
										Per Month
									</MenuItem>
									<MenuItem value={"year"}>Per Year</MenuItem>
								</Select>
							</FormControl>
						</div>
						<Button
							color="secondary"
							variant="contained"
							size="large"
							style={styles.orangeButton}
							onClick={this.goForward}
						>
							Set Parameter
						</Button>
					</div>
				)}

				{pageView === 3 && (
					<div style={styles.contentContainer}>
						<div style={styles.contentTitle}>Rule Review</div>
						<Typography
							variant="body1"
							style={styles.stepText}
							component="h2"
						>
							Step {pageView} of 3
						</Typography>
						<div style={styles.ruleCardsContainer}>
							<RuleCard
								text="Spending Limit"
								ruleInput={`${spend_max} EOS / ${per_period}`}
								icon="dollarCircle.png"
							/>
						</div>
						<Button
							color="secondary"
							variant="contained"
							size="small"
							style={styles.orangeButton}
							onClick={this.setParameter}
						>
							Turn Rule On
						</Button>
						<Typography
							color="secondary"
							variant="body1"
							component="h2"
						>
							cancel
						</Typography>
					</div>
				)}

				{pageView === 4 && <Preferences />}
			</div>
		);
	}
}
