import React, { useState } from "react";
import "./index.scss";
import { LuSettings2, LuCloud, LuSearch, LuX } from "react-icons/lu";

const Navbar = () => {

    const [searchValue, setSearchValue] = useState('');

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
                        onInput={e => setSearchValue(e.target.value)}
					/>
					<div className="icons">
						<LuSearch />
					</div>
					<div className={searchValue.length > 0 ? 'icons-close show' : 'icons-close'} onClick={() => setSearchValue('')}>
						<LuX />
					</div>
				</div>
			</div>
			<div className="Menus">
				<ul>
					<li className="menu cloud-status">
						<div className="icons">
							<LuCloud />
						</div>
					</li>
					<li className="menu settings">
						<div className="icons">
							<LuSettings2 />
						</div>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
