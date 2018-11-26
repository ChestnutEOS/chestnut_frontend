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
import LandingPage from "../LandingPage";

import styles from "./styles";
import accounts from "../../accounts";

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spend_max: "",
			per_period: "month"
		};
	}

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
		const { spend_max, per_period } = this.state;
		return (
			<div style={styles.contentContainer}>
				<div style={styles.contentTitle}>Set parameters</div>
				<Typography
					variant="body1"
					style={styles.stepText}
					component="h3"
				>
					STEP {pageView} OF 3
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
							<MenuItem value={"month"}>Per Month</MenuItem>
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
		);
	}
}
