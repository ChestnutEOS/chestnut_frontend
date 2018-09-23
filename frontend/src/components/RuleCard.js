import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import styles from "./styles";

export default class extends Component {
	render() {
		const { text, icon } = this.props;
		return (
			<Card style={styles.ruleCardContainer}>
				<img style={styles.ruleIcon} src={icon} />
				<div style={styles.ruleText}>{text}</div>
			</Card>
		);
	}
}
