import React, { Component } from "react";

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
// import accounts from "../accounts";
import toolOptions from "../options/toolOptions";

export default class extends Component {
	constructor(props) {
		super(props);

		let inputs = {};
		toolOptions[this.props.selectedToolIndex].inputLabels.map(
			(input, index) => {
				inputs[index] = "";
			}
		);
		this.state = { inputs };
	}

	valueChange = event => {
		let inputs = this.state.inputs;
		inputs[event.target.name] = event.target.value;
		this.setState({ inputs });
	};

	render() {
		const { inputs } = this.state;
		const { onSubmit, selectedToolIndex, goBack } = this.props;
		const toolOption = toolOptions[selectedToolIndex];
		return (
			<div style={styles.contentContainer}>
				<Typography
					variant="subheading"
					style={styles.parameterHeading}
					component="h2"
				>
					{toolOption.text}
				</Typography>
				<div style={styles.toolInputContainer}>
					{toolOption.inputLabels.map((input, index) => {
						return (
							<FormControl key={index} style={styles.formControl}>
								<InputLabel htmlFor={index.toString()}>
									{toolOption.inputLabels[index]}
								</InputLabel>
								<Input
									name={index.toString()}
									onChange={this.valueChange}
									value={inputs[index]}
									startAdornment={
										toolOption.adornments &&
										toolOption.adornments[index] ? (
											<InputAdornment position="start">
												{toolOption.adornments[index]}
											</InputAdornment>
										) : null
									}
								/>
							</FormControl>
						);
					})}
				</div>
				<div style={styles.buttonsWrapper}>
					<Button
						color="primary"
						variant="contained"
						size="large"
						style={styles.backButtonTool}
						onClick={goBack}
					>
						<ArrowLeft />
						<div style={styles.backText}>Back</div>
					</Button>
					<Button
						color="secondary"
						variant="contained"
						size="large"
						style={styles.orangeButtonTool}
						onClick={() => onSubmit(inputs)}
					>
						Submit
					</Button>
				</div>
			</div>
		);
	}
}
