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
import ArrowLeft from "@material-ui/icons/ArrowBackIos";

import Preferences from "../Preferences";
import Header from "../../components/Header";
import RuleCard from "../../components/RuleCard";
import SetParameter from "../../components/SetParameter";
import LandingPage from "../LandingPage";

import styles from "./styles";
// import accounts from "../../accounts";
import ruleOptions from "../../options/ruleOptions";

import EOSIOClient from "../../utils/eosio-client";

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageView: -1,
			spend_max: "",
			per_period: "month",
			selectedRuleIndex: null
		};

		this.eosio = { account: { name: "" } };
		// this.eosio = new EOSIOClient("chestnut");
	}

	goHome = () => {
		this.setState({ pageView: 0 });
		this.eosio = new EOSIOClient("chestnut");
	};

	goBack = () => {
		this.setState({ pageView: this.state.pageView - 1 });
	};

	goForward = () => {
		this.setState({ pageView: this.state.pageView + 1 });
	};

	goTo = pageView => {
		this.setState({ pageView });
	};

	selectRule = selectedRuleIndex => {
		this.setState({ pageView: this.state.pageView + 1, selectedRuleIndex });
	};

	valueChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	setParameter = async event => {
		event.preventDefault();
		// let account = accounts[0].name;
		// let privateKey = accounts[0].privateKey;
		let account = this.eosio.account.name;
		let privateKey = null;
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

	cancel = () => {
		this.setState({ pageView: 1 });
	};

	attachAccount = () => {
		this.eosio = new EOSIOClient("chestnut");
	};

	render() {
		const {
			pageView,
			spend_max,
			per_period,
			selectedRuleIndex
		} = this.state;

		if (pageView === -1) return <LandingPage goClicked={this.goForward} />;
		return (
			<div>
				<Header
					userName={this.eosio.account.name}
					userKey={"Hi"}
					goTo={this.goTo}
					attachAccount={this.attachAccount}
				/>
				{pageView < 4 &&
					pageView > 1 && (
						<Button style={styles.backButton} onClick={this.goBack}>
							<ArrowLeft />
							<div style={styles.backText}>Back</div>
						</Button>
					)}
				{pageView === 0 && (
					<div style={styles.contentContainer}>
						<div style={styles.contentTitle}>
							Ready to create your first rule?
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
						<div style={styles.contentTitle}>Select a rule</div>
						<Typography
							variant="body1"
							style={styles.stepText}
							component="h3"
						>
							STEP {pageView} OF 3
						</Typography>
						<div style={styles.ruleCardsContainer}>
							{ruleOptions.map((item, index) => {
								return (
									<button
										style={styles.buttonWrapper}
										onClick={() => this.selectRule(index)}
										key={index}
									>
										<RuleCard
											text={item.text}
											icon={item.icon}
										/>
									</button>
								);
							})}
						</div>
					</div>
				)}

				{pageView === 2 && (
					<SetParameter
						goForward={this.goForward}
						selectedRuleIndex={selectedRuleIndex}
					/>
				)}

				{pageView === 3 && (
					<div style={styles.contentContainer}>
						<div style={styles.contentTitle}>Rule review</div>
						<Typography
							variant="body1"
							style={styles.stepText}
							component="h3"
						>
							STEP {pageView} OF 3
						</Typography>
						<div style={styles.ruleCardsContainer}>
							<RuleCard
								text={ruleOptions[selectedRuleIndex].text}
								ruleInput={`${spend_max} EOS / ${per_period}`}
								icon={ruleOptions[selectedRuleIndex].icon}
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
						<Button onClick={this.cancel}>
							<Typography
								color="secondary"
								variant="body1"
								component="h2"
								style={styles.cancelButton}
							>
								cancel
							</Typography>
						</Button>
					</div>
				)}

				{pageView === 4 && (
					<Preferences addRuleClicked={() => this.goTo(1)} />
				)}
			</div>
		);
	}
}
