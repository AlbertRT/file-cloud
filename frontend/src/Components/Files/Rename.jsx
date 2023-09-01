import { Button, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { revalidateLiveQueries } from '../../Utils/Func/RevalidateLiveQueries'

const Rename = ({ open, data, cancel }) => {
	if (!data) {
        return;
	}
	const [oldFileName, setOldFilename] = useState("");
	const [fileName, setFileName] = useState("");
	const [fileExtension, setFileExtension] = useState("");
    const [isLoading, setLoading] = useState(false)
    
	let url;
	let detailsUrl;
    let type = data?.type || data?.mimetype
    let key = data?.key || data?.id
    
	if (type.toLowerCase() === "folder") {
		url = `http://localhost:5050/user/file/folder/rename/${key}`;
		detailsUrl = `http://localhost:5050/user/file/folder/details/${key}`;
	} else {
		url = `http://localhost:5050/user/file/rename/${key}`;
		detailsUrl = `http://localhost:5050/user/file/details/${key}`;
	}

	const getFileName = async () => {
		try {
			const res = await axios.get(detailsUrl);

			setOldFilename(res.data.data.originalname);

			type !== "folder" &&
				setFileExtension(res.data.data.originalname.split(".")[1]);
		} catch (error) {
			console.log(error);
		}
	};

	getFileName();

	const rename = async () => {
        setLoading(true)
		try {
			if (type.toLowerCase() === 'folder') {
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
            await revalidateLiveQueries();
            setLoading(false)
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
				<Button type="primary" onClick={rename} loading={isLoading} >
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
