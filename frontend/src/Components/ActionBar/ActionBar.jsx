import "./ActionBar.scss";
import { Button, Dropdown, Space, Modal } from "antd";
import { LuFilePlus2, LuFolderPlus, LuPlus } from "react-icons/lu";
import { useState } from "react";
import { FileDragger } from "../FileUpload/Dragger";
import NewFolder from "../FileUpload/NewFolder";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { mutate } from "swr";

const ActionBar = () => {
	// props
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [openedModal, setOpenedModal] = useState(null);
	const [folderName, setFolderName] = useState("");
    const [isLoading, setLoading] = useState(false);
	let { pathname } = useLocation();

	// Ant Modals
	const showModal = (type) => {
		setOpenedModal(type);
		setIsModalOpen(true);
	};
	const handleCancel = () => {
		setOpenedModal(null);
		setIsModalOpen(false);
	};

	// Ant Dropdown items
	const items = [
		{
			label: "File",
			key: 1,
			icon: <LuFilePlus2 />,
			onClick: () => showModal("file"),
		},
		{
			label: "Folder",
			key: 2,
			icon: <LuFolderPlus />,
			onClick: () => showModal("folder"),
		},
	];

	// create folder
	const createFolder = async () => {
		const body = { name: folderName };
        setLoading(true);
		try {
			await axios.post("http://localhost:5050/user/file/folder/create", body, { params: {pathname} });
            await mutate('http://localhost:5050/user/file')
            setLoading(false);
            setFolderName("");
			setTimeout(() => {
                handleCancel();
            }, 500);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="ActionBar">
			<div className="menus">
				<div className="new">
					<Dropdown
						menu={{
							items,
						}}
					>
						<Button type="primary">
							<Space>
								New
								<div className="icons">
									<LuPlus />
								</div>
							</Space>
						</Button>
					</Dropdown>
				</div>
			</div>
			<Modal
				title={
					openedModal === "file" ? "Upload File" : "Create new Folder"
				}
				open={isModalOpen}
				onCancel={handleCancel}
				footer={[
					openedModal === "folder"
						? [
								<Space>
									{isLoading && (<Spinner />)}
									<Button
										type="primary"
										disabled={folderName === ""}
										onClick={createFolder}
									>
										Make
									</Button>
								</Space>
						  ]
						: ""
				]}
			>
				{openedModal === "file" ? (
					<FileDragger />
				) : (
					<NewFolder
						onInput={(e) => setFolderName(e.target.value)}
						folderName={folderName}
					/>
				)}
			</Modal>
		</div>
	);
};

export default ActionBar;
