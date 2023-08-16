import { Avatar, Button, Space } from "antd";
import { LuEdit3, LuTrash } from "react-icons/lu";
const PPHome = ({ pp, onClick }) => {
	return (
		<>
			<p>
				A profile picture is a small online image representing a person
				on social media. It helps others recognize them.
			</p>
			<div className="pp">
				<Avatar src={pp} size={130} />
			</div>
			<div className="buttons">
				<Button type="default" onClick={onClick}>
					<Space>
						<LuEdit3 /> Change
					</Space>
				</Button>
				<Button type="default" danger>
					<Space>
						<LuTrash />
						Remove
					</Space>
				</Button>
			</div>
		</>
	);
};

export default PPHome;
