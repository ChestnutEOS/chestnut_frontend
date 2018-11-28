const fontFamily = "Proxima Nova Lt";
const nexa = "Nexa";
const fontFamilyHeavy = "NexaHeavy";
const tealLight = "#AEDFD4";

export default {
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
	landingPage: {
		width: "100%"
	},
	contentTitle: {
		fontSize: 40,
		margin: 10,
		marginBottom: 20,
		marginTop: "10%",
		fontFamily: fontFamilyHeavy
	},
	orangeButton: { margin: 10, borderRadius: 0, marginTop: 50, padding: 15 },
	stepText: {
		fontFamily: fontFamily,
		marginBottom: 10,
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
	cancelButton: {
		cursor: "pointer"
	},
	infoContent: {
		width: "100%",
		display: "flex",
		backgroundColor: "#E3E3E3",
		margin: 25,
		marginTop: 0
	},
	leftWrapper: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		width: "45%",
		padding: 15,
		paddingTop: 35,
		paddingBottom: 35
	},
	leftItemWrapper: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 5
	},
	leftSummaryWrapper: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 15,
		borderTop: "1px solid darkgray"
	},
	rightItemWrapper: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		width: "100%"
	},
	rightWrapper: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		width: "45%",
		padding: 15
	},
	balanceText: { fontFamily: fontFamilyHeavy },
	successPaper: {
		display: "flex",
		flexDirection: "column",
		padding: 15,
		backgroundColor: tealLight,
		position: "relative"
	},
	failurePaper: {
		display: "flex",
		flexDirection: "column",
		padding: 15,
		backgroundColor: "red",
		position: "relative"
	},
	closeButton: {
		position: "absolute",
		height: 30,
		width: 30,
		right: 0,
		top: 0,
		color: "white"
	},
	resultHeader: {},
	resultBody: {}
};
