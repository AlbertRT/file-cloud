import React, { useState } from "react";
import "./Navbar.scss";
import {
	LuSettings2,
	LuCloud,
	LuSearch,
	LuX,
	LuEdit2,
	LuLogOut,
	LuShield,
} from "react-icons/lu";
import fiony from "../../Assets/20230718_151947.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [searchValue, setSearchValue] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

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
				<div className="menu-dropdown">
					<div className="account" onClick={() => setShowDropdown(!showDropdown)} >
						<div className="photo-profile">
							<img src={fiony} alt="" />
						</div>
						<div className="name">
							<p>Fiony Alveria</p>
						</div>
					</div>
					<div className={showDropdown ? "dropdown show" : "dropdown"} >
						<div className="profile">
							<div className="photo">
								<img src={fiony} alt="" />
							</div>
							<div className="information">
								<div className="name">
									<p>Fiony Alveria</p>
								</div>
								<div className="email">
									<p>fiony.alveria@jkt48.com</p>
								</div>
							</div>
						</div>
						<div className="dropdown-menus">
							<div className="dropdown-menu">
								<Link>
									<div className="icons">
										<LuEdit2 />
									</div>
									<span>Edit Your Profile</span>
								</Link>
							</div>
							<div className="dropdown-menu">
								<Link>
									<div className="icons">
										<LuShield />
									</div>
									<span>Privacy</span>
								</Link>
							</div>
						</div>
						<div className="bottom-menus-dropdown">
							<div className="bottom-menu-dropdown logout">
								<Link>
									<div className="icons">
										<LuLogOut />
									</div>
									<span>Log Out</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;