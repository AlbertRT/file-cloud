import { Button, Dropdown, Tooltip } from "antd";
import { Link } from "react-router-dom";
import UserAvatar from "../Avatar/Avatar";

const Account = ({ data }) => {
	const items = [
		{
			key: 1,
			label: <Link to={`/account/${data.id}`}>View Account</Link>,
		},
		{
			key: 2,
			label: <Button danger>Log Out</Button>,
		},
	];
	return (
		<Dropdown menu={{ items }} trigger={"click"}>
			<UserAvatar
				src={{
					initial: data.fullName.charAt(0),
					picture: data.profile_picture,
				}}
			/>
		</Dropdown>
	);
};

export default Account;
