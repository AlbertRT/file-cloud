import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";

axios.defaults.withCredentials = true;

const dark_mode = localStorage.getItem('dark_mode')

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<React.StrictMode>
			<NextUIProvider>
				<main className={`text-foreground bg-background`}>
					<App />
				</main>
			</NextUIProvider>
		</React.StrictMode>
	</BrowserRouter>
);
