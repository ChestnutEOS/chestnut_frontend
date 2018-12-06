import React, { Component } from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

import styles from "./styles";

class Header extends Component {
	render() {
		const { userName, userKey, attachAccount, pageView } = this.props;
		return (
			<Toolbar style={styles.headerContainer}>
				<div style={styles.headerLeft}>
					<img
						src="chestnut_logo.png"
						onClick={() => this.props.goTo(-1)}
						style={styles.headerLogo}
					/>
					<div
						// style={styles.selectedHeaderNavText}
						style={
							pageView === 4
								? styles.selectedHeaderNavText
								: styles.headerNavText
						}
						onClick={() => this.props.goTo(4)}
					>
						dashboard
					</div>
					<div
						style={styles.headerNavText}
						onClick={() => this.props.goTo(5)}
					>
						tools
					</div>
					<div style={styles.headerNavText}>explore rules</div>
				</div>
				<div style={styles.headerRight}>
					<div style={styles.rightTextContainer}>
						{userName ? (
							<div>
								<div style={styles.nameText}>{userName}</div>
								<div style={styles.keyText}>{userKey}</div>
							</div>
						) : (
							<div>
								<Button
									style={styles.attachAccount}
									onClick={attachAccount}
								>
									Login with Scatter
								</Button>
							</div>
						)}
					</div>
					<img style={styles.rightIcon} src="account_icon.png" />
				</div>
			</Toolbar>
		);
	}
}

export default Header;
