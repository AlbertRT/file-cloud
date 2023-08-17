import React, { useState } from "react";
import "./Navbar.scss";
import {
	LuSettings2,
	LuCloud,
	LuSearch,
	LuX
} from "react-icons/lu";
import Account from "./Account";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";

const Navbar = ({ data }) => {
	const [searchValue, setSearchValue] = useState("");

	return (
		<nav className="navbar">
			<Link className="logo" to={"/"}>
				File Cloud
			</Link>
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
