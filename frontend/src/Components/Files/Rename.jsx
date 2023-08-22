import { Button, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Rename = ({ open, data, cancel }) => {
	const [oldFileName, setOldFilename] = useState("");
	const [fileName, setFileName] = useState("");
	const [fileExtension, setFileExtension] = useState("");

	let url;
	let detailsUrl;

	const { pathname } = useLocation();

	if (!data) {
		return;
	}

	if (data.type === "folder") {
		url = `http://localhost:5050/user/file/folder/rename/${data.key}`;
		detailsUrl = `http://localhost:5050/user/file/folder/details/${data.key}`;
	} else {
		url = `http://localhost:5050/user/file/rename/${data.key}`;
		detailsUrl = `http://localhost:5050/user/file/details/${data.key}`;
	}

	const getFileName = async () => {
		try {
			const res = await axios.get(detailsUrl);

			setOldFilename(res.data.data.originalname);

			data.type !== "folder" &&
				setFileExtension(res.data.data.originalname.split(".")[1]);
		} catch (error) {
			console.log(error);
		}
	};

	getFileName();

	const rename = async () => {
		try {
			if (data.type.toLowerCase() === 'folder') {
				await axios.patch(
					url,
					{
						newName: fileName,
					},
					{
						params: {
							pathname,
						},
					}
				);
			} else {
                await axios.patch(url, {
					oldName: oldFileName,
					newName: `${fileName}.${fileExtension}`,
				});
            }
			cancel();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal
			open={open}
			onCancel={cancel}
			title="Rename"
			footer={[
				<Button onClick={cancel}>Cancel</Button>,
				<Button type="primary" onClick={rename}>
					Rename
				</Button>,
			]}
		>
			<div
				className="Rename"
				style={{ display: "flex", alignItems: "center" }}
			>
				<Input
					value={fileName}
					placeholder={oldFileName.split(".")[0]}
					onInput={(e) => setFileName(e.target.value)}
				/>
				<p
					className="filename-extension"
					style={{ marginLeft: "1rem" }}
				>
					.{fileExtension}
				</p>
			</div>
		</Modal>
	);
};

export default Rename;
