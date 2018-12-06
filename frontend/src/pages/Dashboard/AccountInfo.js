import React, { Component } from "react";
import styles from "./styles";

import {
	Typography,
	Paper,
	CircularProgress,
	LinearProgress
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

// const CpuPercent = styled(Typography)`
// 	position: absolute;
// 	width: 50%;
// 	top: 20%;
// 	left: 20%;
// 	color: #a3cec3;
// 	fontsize: 40px;
// `;

const RamPercent = styled.div`
	position: absolute;
	top: 20%;
	left: 20%;
	color: #a3cec3;
`;

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
				<div style={styles.rightWrapper}>
					<div style={styles.ramStorageWrapper}>
						<div
							style={{
								width: 300,
								position: "relative"
							}}
						>
							<CircularProgress
								value={ramUsage}
								style={{ width: "95%", height: "auto" }}
								thickness={10}
								variant="static"
							/>
							<Typography style={styles.ramText}>
								{ramUsage.toFixed(0)}%
							</Typography>
						</div>
						<div style={styles.resourcesTextWrapper}>
							<Typography
								variant="body2"
								component="h2"
								style={styles.resourcesHeader}
							>
								RAM (Storage)
							</Typography>
							<Typography
								variant="body2"
								component="p"
								style={styles.resourcesText}
							>
								RAM is used to store application state in
								memory. RAM pricing fluctuates with market
								supply/demand.
							</Typography>
						</div>
					</div>

					<div style={styles.bandwidthWrapper}>
						<div
							style={{
								width: 300,
								height: 80,
								position: "relative"
							}}
						>
							<LinearProgress
								value={cpuUsage}
								variant="determinate"
								style={{
									width: "100%",
									height: "100%"
								}}
							/>
						</div>
						<Typography style={styles.cpuText}>
							{cpuUsage.toFixed(0)}%
						</Typography>
						<div style={styles.resourcesTextWrapper}>
							<Typography
								variant="body2"
								component="h2"
								style={styles.resourcesHeader}
							>
								Bandwidth
							</Typography>
							<Typography
								variant="body2"
								component="p"
								style={styles.resourcesText}
							>
								Stake EOS tokens for bandwidth. Unstaking
								returns these tokens to your available balance.
								Bandwidth 'pays' for the amount of time a
								transaction takes and for utilization of network
								capacity. Bandwidth regenerates over time.
							</Typography>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(AccountInfo);
