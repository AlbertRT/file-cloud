import { Button, Space } from "antd";
import { LuEdit3, LuTrash } from "react-icons/lu";
import UserAvatar from "../../../../../Components/Avatar/Avatar";
const PPHome = ({ data, onClick }) => {
	return (
		<>
			<p>
				A profile picture is a small online image representing a person
				on social media. It helps others recognize them.
			</p>
			<div className="pp">
				<UserAvatar src={{ initial: data.fullName.split("")[0], picture: data.profile_picture }} size={130} />
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
