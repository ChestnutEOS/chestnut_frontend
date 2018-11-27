const fontFamily = "Proxima Nova Lt";
const nexa = "Nexa";
const fontFamilyHeavy = "NexaHeavy";

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
	cancelButton: {
		cursor: "pointer"
	},
	infoContent: {
		width: "100%",
		display: "flex",
		backgroundColor: "#E3E3E3",
		margin: 25
	},
	leftWrapper: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		width: "45%",
		padding: 15
	},
	leftItemWrapper: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center"
	},
	leftSummaryWrapper: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 5,
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
	balanceText: { fontFamily: fontFamilyHeavy }
};
