import React, { Component } from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

import styles from "./styles";

class Header extends Component {
	render() {
		return (
			<Toolbar style={styles.headerContainer}>
				<div style={styles.headerLeft}>
					<img
						src="chestnut_logo.png"
						onClick={() => this.props.goTo(-1)}
						style={styles.headerLogo}
					/>
					<div
						style={styles.selectedHeaderNavText}
						onClick={() => this.props.goTo(4)}
					>
						dashboard
					</div>
					<div style={styles.headerNavText}>explore rules</div>
					<div style={styles.headerNavText}>view all activity</div>
				</div>
				<div style={styles.headerRight}>
					<div style={styles.rightTextContainer}>
						{this.props.userName ? (
							<div>
								<div style={styles.nameText}>
									{this.props.userName}
								</div>
								<div style={styles.keyText}>
									{this.props.userKey}
								</div>
							</div>
						) : (
							<div>
								<Button onClick={this.props.attachAccount}>
									Attach Existing Account
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
