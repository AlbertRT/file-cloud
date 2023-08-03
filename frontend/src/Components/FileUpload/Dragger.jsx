import { Upload } from "antd";
import { LuInbox } from "react-icons/lu";
import axios from "axios";

export const FileDragger = () => {
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
				handleCancel();
			}, 1500);
		} catch (error) {
			onError(error);
		}
	};
	return (
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
				Support for a single or bulk upload. Strictly prohibited from
				uploading company data or other banned files.
			</p>
		</Upload.Dragger>
	);
};