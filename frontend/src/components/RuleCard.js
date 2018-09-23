import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import styles from "./styles";

export default class extends Component {
	render() {
		const { text, icon, ruleInput } = this.props;
		return (
			<Card style={styles.ruleCardContainer}>
				<img style={styles.ruleIcon} src={icon} />
				{ruleInput ? (
					<div style={styles.ruleWrapper}>
						<div style={styles.ruleInput}>{ruleInput}</div>
						<div style={styles.ruleTextSmall}>{text}</div>
					</div>
				) : (
					<div style={styles.ruleText}>{text}</div>
				)}
			</Card>
		);
	}
}
