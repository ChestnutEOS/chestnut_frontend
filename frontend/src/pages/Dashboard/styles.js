const fontFamily = "Proxima Nova Lt";
const nexa = "Nexa";
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
	dashboardContainer: {
		display: "flex",
		flexDirection: "column",
		margin: 20,
		backgroundColor: "rgb(240,240,240)"
	},
	balanceWrapper: {
		backgroundColor: "white",
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "space-between",
		width: "50%",
		margin: 25,
		padding: 15,
		paddingLeft: 30,
		paddingRight: 30
	},
	balanceText: { fontFamily: fontFamilyHeavy },
	leftContainer: {
		flexDirection: "column",
		justifyContent: "flex-start"
	},
	leftContent: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start"
	},
	freezeWrapper: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		margin: 20,
		marginRight: 50
	},
	freezeText: {
		fontFamily: fontFamilyHeavy,
		fontSize: 20
	},
	contentTitle: {
		fontSize: 25,
		margin: 10,
		marginLeft: 20,
		fontFamily: fontFamilyHeavy
	},
	ruleCardContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		flexWrap: "wrap",
		width: "100%"
	},
	activityContent: {
		width: "49%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "white",
		marginTop: 20
	},
	activitiesTitle: {
		fontSize: 25,
		margin: 10,
		marginLeft: 0,
		fontFamily: fontFamilyHeavy,
		paddingTop: 30,
		paddingBottom: 20
	},
	resourcesTitle: {
		fontSize: 25,
		margin: 10,
		marginLeft: 0,
		fontFamily: fontFamilyHeavy,
		paddingTop: 30,
		paddingBottom: 20
	},
	activityText: {
		textAlign: "left",
		marginBottom: 5
	},
	activitiesWrapper: {
		width: "85%"
	},
	questionMark: {
		width: 15,
		marginRight: 10,
		marginBottom: 5,
		height: "auto"
	},
	questionMarkTitle: {
		width: 15,
		marginRight: 10,
		marginBottom: -20,
		height: "auto"
	},
	resourcesContainer: {
		width: "49%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "white",
		marginTop: 20
	},
	resourcesWrapper: {
		width: "85%"
	}
};
