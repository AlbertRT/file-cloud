import { Routes, Route } from "react-router-dom";
import "./index.scss";
import Home from "./Page/Home/Home";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import Folder from "./Page/Folder/Folder";
import Me from "./Page/Account/Me";
import getDataView from "./Utils/Helper/getDataView";

function App() {
    getDataView()
	return (
		<div className="Apps">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/account/:id" element={<Me />} />
				<Route path="/folder/:folderName/*" element={<Folder />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;
