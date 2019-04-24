import React, { Component } from "react";

import { Dialog, Icon, Button } from "@material-ui/core";
import styled from "styled-components";

import styles from "./styles";

class ListModal extends Component {
	render() {
		const { listItems } = this.props;
		return (
			<Dialog style={styles.dialogContainer}>
				{listItems.map(item) => {
					
				}}
			</Dialog>
		);
	}
}

export default ListModal;
