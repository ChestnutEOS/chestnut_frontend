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
		flexDirection: "row"
	},
	buttonWrapper: { background: "none", border: "none", padding: 2 },
	parameterHeading: { fontFamily: fontFamily, fontWeight: 600, fontSize: 20 },
	formControl: { margin: 20, marginBottom: 60, width: 180 }
};
