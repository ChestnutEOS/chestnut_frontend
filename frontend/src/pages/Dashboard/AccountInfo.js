import React, { Component } from "react";
import styles from "./styles";

import { Typography, Paper, LinearProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

class AccountInfo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { accountInfo } = this.props;
		const accountBalance = accountInfo
			? accountInfo.core_liquid_balance.split(" ")[0] * 1
			: 0;
		const total = accountInfo
			? `${(
					accountBalance +
					accountInfo.cpu_weight / 10000 +
					accountInfo.net_weight / 10000
			  ).toFixed(4)} EOS`
			: null;

		const ramUsage = accountInfo
			? (accountInfo.ram_usage / accountInfo.ram_quota) * 100
			: 0;

		const netUsage = accountInfo
			? (accountInfo.net_limit.used / accountInfo.net_limit.max) * 100
			: 0;

		const cpuUsage = accountInfo
			? (accountInfo.cpu_limit.used / accountInfo.cpu_limit.max) * 100
			: 0;
		return (
			<div style={styles.infoContent}>
				<div style={styles.leftWrapper}>
					<div style={styles.leftItemWrapper}>
						<Typography variant="subheading" component="h2">
							Available:
						</Typography>
						<Typography variant="subheading" component="h2">
							{accountInfo.core_liquid_balance}
						</Typography>
					</div>
					<div style={styles.leftItemWrapper}>
						<Typography variant="subheading" component="h2">
							CPU Staked:
						</Typography>
						<Typography variant="subheading" component="h2">
							{(accountInfo.cpu_weight / 10000).toFixed(4)} EOS
						</Typography>
					</div>
					<div style={styles.leftItemWrapper}>
						<Typography variant="subheading" component="h2">
							Net Staked:
						</Typography>
						<Typography variant="subheading" component="h2">
							{(accountInfo.net_weight / 10000).toFixed(4)} EOS
						</Typography>
					</div>
					<div style={styles.leftSummaryWrapper}>
						<Typography variant="subheading" component="h2">
							Total:
						</Typography>
						<Typography variant="subheading" component="h2">
							{total}
						</Typography>
					</div>
				</div>
				<div style={styles.rightWrapper}>
					<div style={styles.rightItemWrapper}>
						<Typography variant="body2" component="h2">
							RAM
						</Typography>
						<div
							style={{
								height: 25,
								width: 300,
								position: "relative"
							}}
						>
							<LinearProgress
								value={ramUsage}
								variant="determinate"
								label="Hi"
								style={{
									width: "100%",
									height: "100%"
								}}
							/>

							<Typography
								variant="body2"
								component="h2"
								style={{
									position: "absolute",
									left: ramUsage * 3 + 5,
									top: 4
								}}
							>
								{ramUsage.toFixed(0)}%
							</Typography>
						</div>
						<Typography
							variant="body2"
							component="h2"
							style={{
								textAlign: "center",
								fontWeight: 600
							}}
						>
							RAM used -{" "}
							{(accountInfo.ram_usage / 1000).toFixed(2)} Kb /{" "}
							{(accountInfo.ram_quota / 1000).toFixed(2)} Kb
						</Typography>
					</div>
					<div style={styles.rightItemWrapper}>
						<Typography variant="body2" component="h2">
							NET
						</Typography>
						<div
							style={{
								height: 25,
								width: 300,
								position: "relative"
							}}
						>
							<LinearProgress
								value={netUsage}
								variant="determinate"
								label="Hi"
								style={{
									width: "100%",
									height: "100%"
								}}
							/>

							<Typography
								variant="body2"
								component="h2"
								style={{
									position: "absolute",
									left: netUsage * 3 + 5,
									top: 4
								}}
							>
								{netUsage.toFixed(0)}%
							</Typography>
						</div>
						<Typography
							variant="body2"
							component="h2"
							style={{
								textAlign: "center",
								fontWeight: 600
							}}
						>
							NET used -{" "}
							{(accountInfo.net_limit.used / 1000).toFixed(2)} Kb
							/ {(accountInfo.net_limit.max / 1000).toFixed(2)} Kb
						</Typography>
					</div>
					<div style={styles.rightItemWrapper}>
						<Typography variant="body2" component="h2">
							CPU
						</Typography>
						<div
							style={{
								height: 25,
								width: 300,
								position: "relative"
							}}
						>
							<LinearProgress
								value={cpuUsage}
								variant="determinate"
								label="Hi"
								style={{
									width: "100%",
									height: "100%"
								}}
							/>

							<Typography
								variant="body2"
								component="h2"
								style={{
									position: "absolute",
									left: cpuUsage * 3 + 5,
									top: 4
								}}
							>
								{cpuUsage.toFixed(0)}%
							</Typography>
						</div>
						<Typography
							variant="body2"
							component="h2"
							style={{
								textAlign: "center",
								fontWeight: 600
							}}
						>
							CPU used -{" "}
							{(accountInfo.cpu_limit.used / 1000).toFixed(2)} µs
							/ {(accountInfo.cpu_limit.max / 1000).toFixed(2)} µs
						</Typography>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(AccountInfo);
