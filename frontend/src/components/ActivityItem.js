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
	render() {
		const { item } = this.props;
		console.log(item);
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
							{info.data.memo
								? info.data.memo
								: info.name === "transfer"
									? info.name + " to " + info.data.to
									: info.name === "buyrambytes"
										? "Buy " + info.data.bytes + " bytes"
										: ""}
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
