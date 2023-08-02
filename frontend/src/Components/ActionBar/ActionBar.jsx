import "./ActionBar.scss";
import { Button, Dropdown, Space, Modal, Upload, notification } from "antd";
import { LuFilePlus2, LuFolderPlus, LuInbox, LuPlus } from "react-icons/lu";
import { useState } from "react";
import Fetcher from "../../Utils/Fetcher";
import axios from "axios";

const ActionBar = () => {
    // props
	const [isModalOpen, setIsModalOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    // Ant notification
    const openNotification = (type, msg) => {
        if (type === 'error') {
            api.error({
                message: 'An Error',
                description: msg
            });
        }
    }
	// Ant Modals
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// Ant Dropdown items
	const items = [
		{
			label: "File",
			key: 1,
			icon: <LuFilePlus2 />,
			onClick: showModal,
		},
		{
			label: "Folder",
			key: 2,
			icon: <LuFolderPlus />,
		},
	];

	// Antd file props
	const uploadImage = async (options) => {
		const { onSuccess, onError, file, onProgress } = options;

		const fmData = new FormData();
		const config = {
			headers: { "content-type": "multipart/form-data" },
		};

		fmData.append("image", file);
		try {
            await axios.post(
				"http://localhost:5050/user/file/upload", 
                fmData,
                config
			);
            onSuccess("Ok");
            setTimeout(() => {
                handleCancel()
            }, 1500)
        } catch (error) {
            onError(error);
            openNotification("error", error.message);
        }
	};
	return (
		<div className="ActionBar">
            {contextHolder}
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
				title="Upload File"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[]}
			>
				<Upload.Dragger
					maxCount={1}
					customRequest={uploadImage}
					accept="image/*"
				>
					<p className="upload-drag-icons">
						<LuInbox />
					</p>
					<p className="ant-upload-text">
						Click or drag file to this area to upload
					</p>
					<p className="ant-upload-hint">
						Support for a single or bulk upload. Strictly prohibited
						from uploading company data or other banned files.
					</p>
				</Upload.Dragger>
			</Modal>
		</div>
	);
};

export default ActionBar;
