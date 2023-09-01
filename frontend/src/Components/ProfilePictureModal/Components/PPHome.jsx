import { Button, Space } from "antd";
import { LuEdit3, LuTrash } from "react-icons/lu";
import UserAvatar from "../../Avatar/Avatar";
import axios from 'axios'
import { revalidateLiveQueries } from "../../../Utils/Func/RevalidateLiveQueries";

const PPHome = ({ data, onClick }) => {
    const ppRemove = async () => {
        try {
            await axios.delete('http://localhost:5050/account/delete/profile_pictures')
            await revalidateLiveQueries()
        } catch (error) {
            console.log(error);
        }
    }
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
				<Button type="default" danger onClick={ppRemove}>
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
