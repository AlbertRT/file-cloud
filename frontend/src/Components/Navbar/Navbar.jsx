import React, { useState } from "react";
import "./Navbar.scss";
import {
	LuSettings2,
	LuCloud,
	LuSearch,
	LuX
} from "react-icons/lu";
import Fetcher from "../../Utils/Helper/Fetcher";
import { useNavigate } from "react-router-dom";
import Account from "./Account";

const Navbar = ({ data }) => {
    const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState("");

    const onLogout = async () => {
        try {
            await Fetcher(['http://localhost:5050/user/logout', 'delete']);
            navigate('/login');
        } catch (error) {
            return
        }
    } 

	return (
		<nav className="navbar">
			<div className="logo">File Cloud</div>
			<div className="Bar">
				<div className="search-bar">
					<input
						type="text"
						className="input-text"
						placeholder="Search File / Folder"
						value={searchValue}
						onInput={(e) => setSearchValue(e.target.value)}
					/>
					<div className="icons">
						<LuSearch />
					</div>
					<div
						className={
							searchValue.length > 0
								? "icons-close show"
								: "icons-close"
						}
						onClick={() => setSearchValue("")}
					>
						<LuX />
					</div>
				</div>
			</div>
			<div className="Menus">
				<div className="menu cloud-status">
					<div className="icons">
						<LuCloud />
					</div>
				</div>
				<div className="menu settings">
					<div className="icons">
						<LuSettings2 />
					</div>
				</div>
				<Account data={data} />
			</div>
		</nav>
	);
};

export default Navbar;
