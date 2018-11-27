import React, { Component } from "react";
import moment from "moment";

import Typography from "@material-ui/core/Typography";

import styles from "./styles";

/*
iconSrc: "success.png",
          timestamp: new Date().valueOf(),
          text: "Transfer to danielle",
          status: "Approved"
*/

export default class extends Component {
	renderText = info => {
		if (info.data.memo)
			return (
				info.data.memo.charAt(0).toUpperCase() + info.data.memo.slice(1)
			);
		if (info.name === "transfer")
			return (
				info.name.charAt(0).toUpperCase() +
				info.name.slice(1) +
				" to " +
				info.data.to
			);
		// if (info.name === "buyrambytes")
		// return "Buy " + info.data.bytes + " bytes";
		if (info.name === "voteproducer")
			return "Voted for " + info.data.producers[0];
		if (info.name)
			return info.name.charAt(0).toUpperCase() + info.name.slice(1);
		// If none of the above apply
		console.log(info);
		return "";
	};

	render() {
		const { item } = this.props;
		const actionTrace = item.action_trace;
		const info = actionTrace.act;
		return (
			<div style={styles.activityContainer}>
				<div style={styles.leftWrapper}>
					<img src="success.png" style={styles.iconWrapper} />
					<div style={styles.activityTextWrapper}>
						<Typography
							variant="body1"
							style={styles.activityText}
							component="h2"
						>
							{this.renderText(info)}
						</Typography>
						<Typography
							variant="body1"
							style={styles.timestampText}
							component="h2"
						>
							{moment(item.block_time).format("LLL")}
						</Typography>
					</div>
				</div>
				<div style={styles.rightWrapper}>
					<Typography
						variant="body1"
						style={styles.amountText}
						component="h2"
					>
						{info.data.quantity}
					</Typography>

					<Typography
						variant="body1"
						style={
							actionTrace.trx_id
								? styles.approvedText
								: styles.rejectedText
						}
						component="h2"
					>
						{actionTrace.trx_id ? "Approved" : "Rejected"}
					</Typography>
				</div>
			</div>
		);
	}
}
