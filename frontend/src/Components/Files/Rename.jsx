import { Button, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";

const Rename = ({ open, data, cancel }) => {
    const [oldFileName, setOldFilename] = useState("");
	const [fileName, setFileName] = useState("");
	const [fileExtension, setFileExtension] = useState("");

	const getFileName = async () => {
		try {
			const res = await axios.get(
				`http://localhost:5050/user/file/details/${data}`
			);

            setOldFilename(res.data.data.originalname);
			setFileExtension(res.data.data.originalname.split(".")[1]);
		} catch (error) {
			console.log(error);
		}
	};

	if (!data) {
        return
    }
    getFileName()

    const rename = async () => {
        const newFileName = `${fileName}.${fileExtension}`

        try {
            await axios.patch('http://localhost:5050/user/file/rename', {
                oldName: oldFileName,
                newName: newFileName
            });
            cancel()
        } catch (error) {
            console.log(error);
        }
    }

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
