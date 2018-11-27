import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";

import styles from "./styles";

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: false
		};
	}

	componentDidMount() {
		this.setState({ checked: this.props.checked });
	}

	render() {
		const {
			text,
			icon,
			ruleInput,
			modifyButton,
			checked,
			empty,
			addRuleClicked,
			description
		} = this.props;
		if (empty)
			return (
				<Card
					style={styles.emptyRuleCardContainer}
					onClick={addRuleClicked}
				>
					<Typography
						variant="body1"
						style={styles.addRuleText}
						component="h2"
					>
						Add Rule +
					</Typography>
				</Card>
			);
		return (
			<Card style={styles.ruleCardContainer}>
				<Tooltip title={description} placement="top">
					<img style={styles.questionMark} src="questionMark.png" />
				</Tooltip>
				<img style={styles.ruleIcon} src={icon} />
				{ruleInput ? (
					<div style={styles.ruleWrapper}>
						<div style={styles.ruleInput}>{ruleInput}</div>
						<div style={styles.ruleTextSmall}>
							{text.toUpperCase()}
						</div>
					</div>
				) : (
					<div style={styles.ruleText}>{text}</div>
				)}
				{modifyButton && (
					<Switch
						style={styles.ruleSwitch}
						checked={this.state.checked}
						onChange={() =>
							this.setState({ checked: !this.state.checked })
						}
					/>
				)}
			</Card>
		);
	}
}
