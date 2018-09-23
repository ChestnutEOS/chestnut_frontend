const fontFamily = "Nexa";
const fontFamilyHeavy = "NexaHeavy";

// export default {
// 	formContainer: {
// 		display: "flex",
// 		flexDirection: "column"
// 	}
// };

// export default theme => ({
// card: {
// 	margin: "auto",
// 	marginTop: 20,
// 	width: "90%",
// 	maxWidth: 700
// },
// paper: {
// 	...theme.mixins.gutters(),
// 	paddingTop: theme.spacing.unit * 2,
// 	paddingBottom: theme.spacing.unit * 2,
// 	margin: "auto",
// 	marginTop: 30,
// 	width: "90%",
// 	maxWidth: 500
// },
// formContainer: {
// 	display: "flex",
// 	flexDirection: "column",
// 	margin: "auto",
// 	width: "90%",
// 	maxWidth: 300
// },
// formControl: {
// 	margin: theme.spacing.unit
// },
// formButton: {
// 	marginTop: theme.spacing.unit
// },
// pre: {
// 	background: "#ccc",
// 	padding: 10,
// 	marginBottom: 0
// }
// });

export default {
	preferencesContainer: {
		display: "flex",
		flexDirection: "row",
		margin: 20,
		marginLeft: 75,
		marginRight: 75
	},
	leftContent: {
		width: "65%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start"
	},
	rightContent: {
		width: "35%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "#E3E3E3"
	},
	balanceWrapper: {
		backgroundColor: "white",
		height: 25,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "90%",
		margin: 10,
		padding: 10
	}
};
