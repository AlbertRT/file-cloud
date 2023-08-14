import { Button, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";

const Rename = ({ open, data, cancel }) => {
	const [filename, setFilename] = useState("");
	const [fileExtension, setFileExtension] = useState("");

	const getFileName = async () => {
		try {
			const res = await axios.get(
				`http://localhost:5050/user/file/details/${data}`
			);

			setFilename(res.data.data.originalname.split(".")[0]);
			setFileExtension(res.data.data.originalname.split(".")[1]);
		} catch (error) {
			console.log(error);
		}
	};

	if (!data) {
        return
    }
    getFileName()

	return (
		<Modal
			open={open}
			onCancel={cancel}
			title="Rename"
			footer={[<Button onClick={cancel}>Cancel</Button>, <Button type="primary">Rename</Button>]}
		>
			{filename && (
				<div
					className="Rename"
					style={{ display: "flex", alignItems: "center" }}
				>
					<Input
						value={filename.split(".")[0]}
						onChange={(e) => setFilename(e.target.value)}
					/>
					<p
						className="filename-extension"
						style={{ marginLeft: "1rem" }}
					>
						.{fileExtension}
					</p>
				</div>
			)}
		</Modal>
	);
};

export default Rename;
