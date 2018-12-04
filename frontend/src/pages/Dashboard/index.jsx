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
import Tools from "../Tools";

import styles from "./styles";
// import accounts from "../../accounts";
import ruleOptions from "../../options/ruleOptions";

import EOSIOClient from "../../utils/eosio-client";

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageView: -1,
			firstInput: "",
			secondInput: 7,
			selectedRuleIndex: null,
			account: null
		};

		// this.eosio = null;
		// this.eosio = { account: { name: "" } };
		this.eosio = new EOSIOClient("Chestnut");
		// this.eosio.login();
	}

	// Key generator https://ipfs.io/ipfs/QmW4XxaEg8cWsYisfjnjqLFi1MbHMYjt7nbCh8ZHwgg9c2

	goHome = () => {
		this.setState({ pageView: 0 });
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

	setInputs = (firstInput, secondInput) => {
		this.setState({ firstInput, secondInput });
		this.goForward();
	};

	setParameter = async event => {
		event.preventDefault();
		const {
			firstInput,
			secondInput,
			account,
			selectedRuleIndex
		} = this.state;

		let data = {};
		data.user = account.name;

		let first = firstInput;
		let ruleAdd = ruleOptions[selectedRuleIndex].add;

		if (ruleAdd === "addeoslimit" || ruleAdd === "addtknlimit")
			first = first.toString() + ".0000 EOS";

		data[ruleOptions[selectedRuleIndex].firstParam] = first;
		if (secondInput)
			data[ruleOptions[selectedRuleIndex].secondParam] = secondInput;

		const result = await this.eosio.chestnutTransaction(
			ruleOptions[selectedRuleIndex].add,
			data
		);

		this.goForward();

		console.log(result);

		// if (result.processed.receipt.status === "executed") {
		// 	this.setState({ success: result.transaction_id, failure: null });
		// } else {
		// 	this.setState({
		// 		success: null,
		// 		failure: "Error sending transaction.  Please try again."
		// 	});
		// }
		// this.getAccountInfo();
		// // let account = accounts[0].name;
		// // let privateKey = accounts[0].privateKey;
		// let account = this.eosio.account.name;
		// let privateKey = null;
		// let firstInput = this.state.firstInput;
		// let trans_max = 0;

		// let actionName = "";
		// let actionData = {};

		// // switch (event.type) {
		// // 	case "submit":
		// actionName = "update";
		// actionData = {
		// 	_user: account,
		// 	_firstInput: firstInput,
		// 	_trans_max: trans_max
		// };
		// // break;
		// // 	default:
		// // 		return;
		// // }

		// // const eos = Eos({ keyProvider: privateKey });
		// const result = await this.eosio.transaction({
		// 	actions: [
		// 		{
		// 			account: "chestnutDemo",
		// 			name: actionName,
		// 			authorization: [
		// 				{
		// 					actor: account,
		// 					permission: "active"
		// 				}
		// 			],
		// 			data: actionData
		// 		}
		// 	]
		// });

		// console.log(result);
		// this.goForward();

		// this.getTable();
	};

	cancel = () => {
		this.setState({ pageView: 1 });
	};

	attachAccount = () => {
		// console.log("hi");
		this.eosio.login(account => {
			console.log(account);
			this.setState({ account });
		});
		// this.setState({ eosio: new EOSIOClient("chestnut") });
	};

	render() {
		const {
			pageView,
			firstInput,
			secondInput,
			selectedRuleIndex,
			account
		} = this.state;

		let secondInputText;
		switch (secondInput) {
			case 1:
				secondInputText = "Day";
				break;
			case 7:
				secondInputText = "Week";
				break;
			case 30:
				secondInputText = "Month";
				break;
			case 365:
				secondInputText = "Year";
				break;
			default:
				secondInputText === null;
		}

		let ruleInput;
		if (
			(selectedRuleIndex || selectedRuleIndex === 0) &&
			ruleOptions[selectedRuleIndex].add === "addeoslimit"
		)
			ruleInput = `${firstInput} EOS / ${secondInputText}`;
		if (
			(selectedRuleIndex || selectedRuleIndex === 0) &&
			ruleOptions[selectedRuleIndex].add === "addtxlimit"
		)
			ruleInput = `${firstInput} Tx / ${secondInputText}`;
		if (
			(selectedRuleIndex || selectedRuleIndex === 0) &&
			ruleOptions[selectedRuleIndex].add === "addwhitelist"
		)
			ruleInput = `${firstInput}`;
		if (
			(selectedRuleIndex || selectedRuleIndex === 0) &&
			ruleOptions[selectedRuleIndex].add === "addblacklist"
		)
			ruleInput = `${firstInput}`;
		if (
			(selectedRuleIndex || selectedRuleIndex === 0) &&
			ruleOptions[selectedRuleIndex].add === "addtknlimit"
		)
			ruleInput = `${firstInput} EOS / Tx`;

		if (pageView === -1) return <LandingPage goClicked={this.goForward} />;
		return (
			<div>
				<Header
					userName={account ? account.name : null}
					userKey={account ? account.publicKey : null}
					goTo={this.goTo}
					attachAccount={this.attachAccount}
					pageView={pageView}
				/>
				{pageView < 4 &&
					pageView > 1 && (
						<Button style={styles.backButton} onClick={this.goBack}>
							<ArrowLeft />
							<div style={styles.backText}>Back</div>
						</Button>
					)}
				{pageView === 0 &&
					account && (
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

				{pageView === 0 &&
					!account && (
						<div style={styles.contentContainer}>
							<div style={styles.contentTitle}>Register</div>
							<Button
								color="secondary"
								variant="contained"
								size="large"
								style={styles.orangeButton}
								onClick={this.attachAccount}
							>
								Connect Scatter
							</Button>
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
											description={item.description}
										/>
									</button>
								);
							})}
						</div>
					</div>
				)}

				{pageView === 2 && (
					<SetParameter
						setInputs={this.setInputs}
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
								ruleInput={ruleInput}
								icon={ruleOptions[selectedRuleIndex].icon}
								description={
									ruleOptions[selectedRuleIndex].description
								}
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
					<Preferences
						addRuleClicked={() => this.goTo(1)}
						account={account}
						eosio={this.eosio}
					/>
				)}
				{pageView === 5 && (
					<Tools eosio={this.eosio} account={account} />
				)}
			</div>
		);
	}
}
