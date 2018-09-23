const blackColor = "#000000";
const whiteColor = "#FFF";
const tealLight = "#AEDFD4";
const tealDark = "#A3CEC3";
const orangeColor = "#FF5B3F";
const fontFamily = "Nexa";
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
		fontFamily: fontFamily
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
		fontFamily: fontFamily,
		fontSize: 14
	},
	keyText: {
		color: orangeColor,
		fontFamily: fontFamily,
		fontSize: 10
	},
	//Rule Card
	ruleCardContainer: {
		background: tealDark,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		height: 180,
		width: 180,
		margin: 2
	},
	ruleIcon: {
		height: 65,
		width: "auto",
		margin: 15
	},
	ruleText: {
		fontFamily: fontFamilyHeavy,
		fontSize: 22,
		textAlign: "center",
		overflowX: "wrap",
		margin: 15
	}
};
