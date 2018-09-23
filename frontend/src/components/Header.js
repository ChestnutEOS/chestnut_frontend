import React, { Component } from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Icon from "@material-ui/core/Icon";

import styles from "./styles";

class Header extends Component {
	render() {
		return (
			<Toolbar style={styles.headerContainer}>
				<div style={styles.headerLeft}>
					<img src="chestnut_logo.png" style={styles.headerLogo} />
					<div style={styles.headerNavText}>dashboard</div>
					<div style={styles.headerNavText}>expore rules</div>
					<div style={styles.headerNavText}>view all activity</div>
				</div>
				<div style={styles.headerRight}>
					<div style={styles.rightTextContainer}>
						<div style={styles.nameText}>{this.props.userName}</div>
						<div style={styles.keyText}>{this.props.userKey}</div>
					</div>
					<img src="account_icon.png" />
				</div>
			</Toolbar>
		);
	}
}

export default Header;
