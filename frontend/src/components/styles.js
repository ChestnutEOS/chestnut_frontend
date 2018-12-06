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
		marginRight: 50,
		cursor: "pointer"
	},
	headerNavText: {
		margin: 40,
		color: whiteColor,
		fontSize: 14,
		fontFamily: nexa,
		letterSpacing: 1.5,
		borderBottom: "3px solid black",
		cursor: "pointer"
	},
	selectedHeaderNavText: {
		margin: 40,
		color: whiteColor,
		fontSize: 14,
		fontFamily: nexa,
		letterSpacing: 1.5,
		borderBottom: "3px solid #FF5B3F",
		cursor: "pointer"
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
		background: "white",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		height: 200,
		padding: 15,
		width: 200,
		margin: 10,
		marginBottom: 15,
		cursor: "pointer",
		borderRadius: 0,
		position: "relative"
	},
	ruleCardContainerMarginRight: {
		background: "white",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		height: 230,
		width: 230,
		margin: 0,
		marginBottom: 15,
		marginRight: 20,
		borderRadius: 0,
		position: "relative"
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
		position: "absolute",
		top: 5,
		right: 5
	},
	closeXButton: {
		width: 15,
		height: "auto",
		position: "absolute",
		top: 10,
		left: 10,
		cursor: "pointer"
	},
	closeXImage: {
		width: 15,
		height: "auto",
		position: "absolute",
		top: 10,
		left: 10,
		cursor: "pointer"
	},
	ruleSwitchContainer: {
		width: "100%",
		height: "20%",
		background: tealLight,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: -10
	},
	emptyRuleCardContainer: {
		// background: "white",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		height: 200,
		padding: 15,
		width: 200,
		margin: 0,
		cursor: "pointer",
		border: "2px dashed lightgray",
		borderRadius: 0
	},
	addRuleText: {
		color: "gray",
		fontSize: 20
	},

	// Tool Card
	//Rule Card
	toolCardContainer: {
		background: tealLight,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		height: 150,
		padding: 15,
		width: 150,
		margin: 0,
		cursor: "pointer",
		borderRadius: 0
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
	},
	contentContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		maxWidth: 700,
		width: "90%",
		margin: "auto",
		height: "90%"
	},
	contentTitle: {
		fontSize: 40,
		margin: 10,
		marginBottom: 20,
		marginTop: "20%",
		fontFamily: fontFamilyHeavy
	},
	orangeButton: { margin: 10, borderRadius: 0, marginTop: 50, padding: 15 },
	stepText: {
		fontFamily: fontFamily,
		marginBottom: 45,
		fontWeight: 600
	},
	ruleCardsContainer: {
		display: "flex",
		flexDirection: "row",
		borderRadius: 0
	},
	buttonWrapper: { background: "none", border: "none", padding: 2 },
	parameterHeading: { fontFamily: fontFamily, fontWeight: 600, fontSize: 20 },
	formControl: { margin: 20, marginBottom: 60, width: 180 },
	backButton: {
		position: "absolute",
		top: "35%",
		left: 40
	},

	backText: {
		paddingTop: 2
	},
	attachAccount: {
		color: "white"
	},
	buttonsWrapper: {
		display: "flex"
	},
	backButtonTool: { margin: 10, borderRadius: 0, marginTop: 5, padding: 15 },
	orangeButtonTool: {
		margin: 10,
		borderRadius: 0,
		marginTop: 5,
		padding: 15
	},
	toolInputContainer: {
		display: "flex"
	}
};
