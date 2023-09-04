import axios from 'axios';
import { revalidateLiveQueries } from "../../../../Utils/Func/RevalidateLiveQueries";

const LocalTabs = () => {
    const pathname = "root"
    const onPreview = async (file) => {
		let src = file.url;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};

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
            await revalidateLiveQueries()
		} catch (error) {
			onError(error);
            console.log(error);
		}
	};

    return (
		// <ImgCrop rotationSlider showReset aspectSlider>
		// 	<Upload.Dragger
		// 		maxCount={1}
		// 		customRequest={uploadImage}
		// 		accept="image/*"
		// 		onPreview={onPreview}
		// 	>
		// 		<p className="upload-drag-icons">
		// 			<LuInbox />
		// 		</p>
		// 		<p className="ant-upload-text">
		// 			Click or drag file to this area to upload
		// 		</p>
		// 		<p className="ant-upload-hint">
		// 			Support for a single or bulk upload. Strictly prohibited
		// 			from uploading company data or other banned files.
		// 		</p>
		// 	</Upload.Dragger>
		// </ImgCrop>
        <div>upload</div>
	);
}

export default LocalTabs