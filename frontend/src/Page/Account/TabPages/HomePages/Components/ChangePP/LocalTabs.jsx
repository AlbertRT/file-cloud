import { Upload } from "antd"
import axios from 'axios';
import {LuInbox} from 'react-icons/lu';

const LocalTabs = () => {
    const pathname = "root"

    const uploadImage = async (options) => {
		const { onSuccess, onError, file } = options;

		const fmData = new FormData();
		fmData.append("profile_picture", file);

		try {
			await axios.post(
				`http://localhost:5050/account/edit/profile_pictures`,
				fmData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					params: { pathname },
				}
			);
			onSuccess("Ok");
		} catch (error) {
			onError(error);
            console.log(error);
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
}

export default LocalTabs