import React from "react";
import ReactDOM from "react-dom";
import Preferences from "./pages/Preferences";
import Dashboard from "./pages/Dashboard";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#AEDFD4", // Teal
			contrastText: "#000" // Black
		},
		secondary: {
			main: "#FF5B3F", // Orange
			contrastText: "#fff"
		}
	},
	typography: {
		// Sets the font throughout the application.  Requires using Material UI typography component.
		fontFamily: ["Proxima Nova Lt", "Nexa", "NexaHeavy", "Roboto"].join(",")
	}
});

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Dashboard />
	</MuiThemeProvider>,
	document.getElementById("root")
);
