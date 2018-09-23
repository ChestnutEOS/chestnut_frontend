const fontFamily = "Nexa";
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
	contentTitle: {
		fontSize: 40,
		margin: 10,
		marginTop: "20%",
		fontFamily: fontFamilyHeavy
	},
	orangeButton: { margin: 10 },
	stepText: {
		fontFamily: fontFamilyHeavy,
		marginBottom: 45
	},
	ruleCardsContainer: {
		display: "flex",
		flexDirection: "row"
	},
	buttonWrapper: { background: "none", border: "none", padding: 2 },
	parameterHeading: { fontFamily: fontFamilyHeavy, fontSize: 20 },
	formControl: { margin: 5, width: 130 }
};
