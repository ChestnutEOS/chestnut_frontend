// export default {
// 	formContainer: {
// 		display: "flex",
// 		flexDirection: "column"
// 	}
// };

export default theme => ({
	card: {
		margin: 20
	},
	paper: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		margin: "auto",
		marginTop: 30,
		width: "90%",
		maxWidth: 500
	},
	formContainer: {
		display: "flex",
		flexDirection: "column",
		margin: "auto",
		width: "90%",
		maxWidth: 300
	},
	formControl: {
		margin: theme.spacing.unit
	},
	formButton: {
		marginTop: theme.spacing.unit
	},
	pre: {
		background: "#ccc",
		padding: 10,
		marginBottom: 0
	}
});
