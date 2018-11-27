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

import styles from "./styles";
import accounts from "../accounts";
import ruleOptions from "../options/ruleOptions";

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: "",
			per_period: "month"
		};
	}

	valueChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { input, per_period } = this.state;
		const { goForward, selectedRuleIndex } = this.props;
		return (
			<div style={styles.contentContainer}>
				<div style={styles.contentTitle}>Set parameters</div>
				<Typography
					variant="body1"
					style={styles.stepText}
					component="h3"
				>
					STEP 2 OF 3
				</Typography>
				<Typography
					variant="subheading"
					style={styles.parameterHeading}
					component="h2"
				>
					{ruleOptions[selectedRuleIndex].text}
				</Typography>
				<div style={styles.inputContainer}>
					<FormControl style={styles.formControl}>
						<Input
							name="input"
							type="number"
							onChange={this.valueChange}
							value={input}
							startAdornment={
								selectedRuleIndex === 0 ? (
									<InputAdornment position="start">
										EOS
									</InputAdornment>
								) : null
							}
						/>
					</FormControl>
					{(selectedRuleIndex === 0 || selectedRuleIndex === 1) && (
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
					)}
				</div>
				<Button
					color="secondary"
					variant="contained"
					size="large"
					style={styles.orangeButton}
					onClick={goForward}
				>
					Set Parameter
				</Button>
			</div>
		);
	}
}
