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
			firstInput: "",
			secondInput: 7
		};
	}

	valueChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { firstInput, secondInput } = this.state;
		const { setInputs, selectedRuleIndex } = this.props;
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
							name="firstInput"
							type={ruleOptions[selectedRuleIndex].firstParamType}
							onChange={this.valueChange}
							value={firstInput}
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
								value={secondInput}
								onChange={this.valueChange}
								inputProps={{
									name: "secondInput",
									id: "secondInput",
									style: { textAlign: "center" }
								}}
							>
								<MenuItem value={1}>Per Day</MenuItem>
								<MenuItem value={7}>Per Week</MenuItem>
								<MenuItem value={30}>Per Month</MenuItem>
								<MenuItem value={365}>Per Year</MenuItem>
							</Select>
						</FormControl>
					)}
				</div>
				<Button
					color="secondary"
					variant="contained"
					size="large"
					style={styles.orangeButton}
					onClick={() => setInputs(firstInput, secondInput)}
				>
					Set Parameter
				</Button>
			</div>
		);
	}
}
