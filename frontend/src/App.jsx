import { Routes, Route } from "react-router-dom";
import "./index.scss";
import Home from "./Page/Home/Home";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import Me from "./Page/Account/Me";
import getDataView from "./Utils/Helper/getDataView";
import Share from "./Page/Share/Share";
import { SWRConfig } from "swr";
import { trackLiveQueries } from "./Utils/Func/RevalidateLiveQueries";
import './index.css'
import Settings from "./Page/Settings/Settings";

function App() {
    getDataView()
	return (
		<SWRConfig value={{
            use: [trackLiveQueries]
        }}>
			<div className="Apps">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/account" element={<Me />} />
					<Route path="/board/:boardId" element={<Me />} />
					<Route path="/share/:type/:id" element={<Share />} />
					<Route path="/app/settings" element={<Settings />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</div>
		</SWRConfig>
	);
}

export default App;
