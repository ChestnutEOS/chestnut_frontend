const blackColor = "#000000";
const whiteColor = "#FFF";
const tealLight = "#AEDFD4";
const tealDark = "#A3CEC3";
const orangeColor = "#FF5B3F";
const fontFamily = "Proxima Nova Lt";
const nexa = "Nexa";
const fontFamilyHeavy = "NexaHeavy";

export default {
	//Header
	headerContainer: {
		height: 100,
		background: blackColor,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	headerLeft: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	headerLogo: {
		height: 75,
		marginRight: 50
	},
	headerNavText: {
		margin: 40,
		color: whiteColor,
		fontSize: 14,
		fontFamily: nexa,
		letterSpacing: 1.5
	},
	selectedHeaderNavText: {
		margin: 40,
		color: whiteColor,
		fontSize: 14,
		fontFamily: nexa,
		letterSpacing: 1.5,
		borderBottom: "3px solid #FF5B3F"
	},
	headerRight: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		margin: 20
	},
	rightTextContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "flex-end",
		margin: 10
	},
	nameText: {
		color: whiteColor,
		fontFamily: nexa,
		letterSpacing: 1.5,
		fontSize: 14
	},
	keyText: {
		color: orangeColor,
		fontFamily: nexa,
		letterSpacing: 1,
		fontSize: 10
	},
	rightIcon: {
		height: 25,
		width: "auto",
		paddingLeft: 15
	},

	//Rule Card
	ruleCardContainer: {
		background: tealLight,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		height: 150,
		padding: 15,
		width: 150,
		margin: 0,
		cursor: "pointer"
	},
	ruleIcon: {
		height: 65,
		width: "auto",
		margin: 10
	},
	ruleText: {
		fontFamily: fontFamilyHeavy,
		fontSize: 20,
		textAlign: "center",
		overflowX: "wrap",
		margin: 10
	},
	ruleWrapper: {
		margin: 10
	},
	ruleInput: {
		fontFamily: fontFamilyHeavy,
		fontSize: 14,
		marginBottom: 10,
		textAlign: "center",
		overflowX: "wrap"
	},
	ruleTextSmall: {
		fontFamily: fontFamilyHeavy,
		fontSize: 12,
		textAlign: "center",
		overflowX: "wrap"
	},
	questionMark: {
		width: 20,
		height: "auto",
		position: "relative",
		top: 1,
		marginRight: -145
	},
	// ruleSwitch: { width: "100%" },
	emptyRuleCardContainer: {
		// background: "white",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		height: 150,
		padding: 15,
		width: 150,
		margin: 0,
		cursor: "pointer",
		border: "2px dashed lightgray"
	},
	addRuleText: {
		color: "gray",
		fontSize: 20
	},

	// ActivityItem
	activityContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderTop: "1px solid lightgray",
		height: 90
	},
	leftWrapper: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginLeft: 20
	},
	iconWrapper: {
		width: 30,
		height: "auto",
		marginRight: 20
	},
	rightWrapper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end"
	},
	approvedText: {
		color: "green"
	},
	rejectedText: {
		color: "red"
	}
};
