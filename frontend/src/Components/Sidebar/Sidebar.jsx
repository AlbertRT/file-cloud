import React, { useState } from "react";
import "./Sidebar.scss";
import {
	LuHome,
	LuFolderClosed,
	LuChevronRight,
	LuFileImage,
	LuFileHeart,
	LuFolderOpen,
	LuTrash2,
	LuHardDrive,
} from "react-icons/lu";
import { Link } from "react-router-dom";
import { formatBytes} from '../../Utils/Helper/DataConverter';
import "../../variables.scss";

const Sidebar = ({data}) => {
	const [isSubmenuOpen, setOpensubmenu] = useState(false);
	const storage = {
		used: data.storage,
		total: data.default_storage,
	};

	const percentages = Math.round((storage.used / storage.total) * 100);
    const color = percentages <= 50 ? "#457b9d" : percentages <= 75 ? "#ffce54" : "#e63946";

	return (
		<div className="Sidebar">
			<div className="Menus">
				<div className="menu">
					<Link className="home">
						<div className="icons">
							<LuHome />
						</div>
						<span>Home</span>
					</Link>
				</div>
				<div className="menu-expand folders">
					<div
						className="expand-title"
						onClick={() => setOpensubmenu(!isSubmenuOpen)}
					>
						<div className="title">
							<div className="icons">
								{isSubmenuOpen ? (
									<LuFolderOpen />
								) : (
									<LuFolderClosed />
								)}
							</div>
							<span>Folders</span>
						</div>
						<div
							className={
								!isSubmenuOpen
									? "expand-icon"
									: "expand-icon expanded"
							}
						>
							<LuChevronRight />
						</div>
					</div>
					<div
						className={
							isSubmenuOpen ? "submenu expanded" : "submenu"
						}
					>
						<div className="menu">
							<Link className="subMenu">
								<div className="icons">
									<LuFileHeart />
								</div>
								<span>Liked</span>
							</Link>
						</div>
						<div className="menu">
							<Link className="subMenu">
								<div className="icons">
									<LuFileImage />
								</div>
								<span>Images</span>
							</Link>
						</div>
					</div>
				</div>
				<div className="menu">
					<Link className="trash-bin">
						<div className="icons">
							<LuTrash2 />
						</div>
						<span>Trash Bin</span>
					</Link>
				</div>
			</div>
			<div className="Account">
				<div className="storage">
					<div className="title">
						<div className="icons">
							<LuHardDrive />
						</div>
						<span>Storage</span>
					</div>
					<div className="storage-bar">
						<div className="bar-container">
							<div
								className="bar"
								style={{
									width: `${percentages}%`,
									background: color,
								}}
							></div>
						</div>
						<div className="storage-used">
							<span className="using">
								{formatBytes(storage.used)}
							</span>
							of
							<span className="total">
								{formatBytes(storage.total)}
							</span>
							<span className="percentage">({percentages}%)</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
