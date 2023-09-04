// import { Upload } from "antd";
import { LuInbox } from "react-icons/lu";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { revalidateLiveQueries } from "../../Utils/Func/RevalidateLiveQueries"

export const FileDragger = () => {
	let { pathname } = useLocation();

	if (pathname === "/") {
		pathname = "root";
	}

	const uploadImage = async (options) => {
		const { onSuccess, onError, file } = options;

		const fmData = new FormData();
		fmData.append("image", file);

		try {
			await axios.post(
				`http://localhost:5050/user/file/upload`,
				fmData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    params: { pathname }
                 }
			);
			onSuccess("Ok");

            await revalidateLiveQueries()
		} catch (error) {
			onError(error);
            console.log(error);
		}
	};
	return (
		// <Upload.Dragger
		// 	maxCount={1}
		// 	customRequest={uploadImage}
		// 	accept="image/*"
		// >
		// 	<p className="upload-drag-icons">
		// 		<LuInbox />
		// 	</p>
		// 	<p className="ant-upload-text">
		// 		Click or drag file to this area to upload
		// 	</p>
		// 	<p className="ant-upload-hint">
		// 		Support for a single or bulk upload. Strictly prohibited from
		// 		uploading company data or other banned files.
		// 	</p>
		// </Upload.Dragger>
        <div></div>
	);
};
