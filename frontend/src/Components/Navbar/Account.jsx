import { Avatar, Button, Dropdown, Tooltip } from "antd";
import pp from "../../Assets/20230718_151947.jpg";
import { Link } from "react-router-dom";

const Account = ({ data }) => {
    console.log(data);
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
			<Tooltip title={data.username}>
				<Avatar src={pp} />
			</Tooltip>
		</Dropdown>
	);
};

export default Account;
