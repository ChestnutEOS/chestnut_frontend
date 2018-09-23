import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Preferences from "../Preferences";
import Header from "../../components/Header";

import styles from "./styles";
import accounts from "../../accounts";

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageView: 0
		};
	}

	render() {
		const { pageView } = this.state;
		return (
			<div>
				<Header
					userName={accounts[0].name}
					userKey={accounts[0].publicKey}
				/>
				<div style={styles.contentContainer}>
					<div style={styles.contentTitle}>
						Ready to Create Your First Rule?
					</div>
					<Button
						color="secondary"
						variant="contained"
						size="large"
						style={styles.orangeButton}
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
				{/*<Preferences />*/}
			</div>
		);
	}
}
