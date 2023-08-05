import { Button, Image } from "antd";
import { useState } from "react";
const ImagePreview = ({ preview, name }) => {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<Button type="text" onClick={() => setVisible(true)}>
				{name}
			</Button>
			<Image
				src={preview}
				style={{ display: "none" }}
				preview={{
					visible,
					src: preview,
					onVisibleChange: (val) => {
						setVisible(val);
					},
				}}
			/>
		</>
	);
};

export default ImagePreview;
