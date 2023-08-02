import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { ConfigProvider, theme } from "antd";

const config = {
	token: {
		colorPrimary: "#1d3557",
	},
};

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<React.StrictMode>
			<ConfigProvider theme={config}>
				<App />
			</ConfigProvider>
		</React.StrictMode>
	</BrowserRouter>
);
