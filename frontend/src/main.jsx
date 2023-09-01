import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<React.StrictMode>
			<NextUIProvider>
				<App />
			</NextUIProvider>
		</React.StrictMode>
	</BrowserRouter>
);
