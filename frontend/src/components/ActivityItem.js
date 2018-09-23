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
		const info = this.props.item;
		return (
			<div style={styles.activityContainer}>
				<div style={styles.leftWrapper}>
					<img src={info.iconSrc} style={styles.iconWrapper} />
					<div style={styles.activityTextWrapper}>
						<Typography
							variant="body1"
							style={styles.activityText}
							component="h2"
						>
							{info.text}
						</Typography>
						<Typography
							variant="body1"
							style={styles.timestampText}
							component="h2"
						>
							{moment(info.timestamp).format("LLL")}
						</Typography>
					</div>
				</div>
				<div style={styles.rightWrapper}>
					<Typography
						variant="body1"
						style={styles.amountText}
						component="h2"
					>
						{info.amount} EOS
					</Typography>

					<Typography
						variant="body1"
						style={
							info.status === "Approved"
								? styles.approvedText
								: styles.rejectedText
						}
						component="h2"
					>
						{info.status}
					</Typography>
				</div>
			</div>
		);
	}
}
