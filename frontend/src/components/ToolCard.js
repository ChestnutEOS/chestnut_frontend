import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import styles from "./styles";

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			text,
			description,
			icon,
			ruleInput,
			modifyButton,
			addRuleClicked
		} = this.props;
		return (
			<Card style={styles.toolCardContainer}>
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
			</Card>
		);
	}
}
