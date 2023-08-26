import { Button, Dropdown, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "../Avatar/Avatar";
import axios from 'axios'

const Account = ({ data }) => {
    const navigate = useNavigate()
    const onLogout = async () => {
        try {
            await axios.delete("http://localhost:5050/user/logout");
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }

	const items = [
		{
			key: 1,
			label: <Link to={`/account/${data.id}`}>View Account</Link>,
		},
		{
			key: 2,
			label: <Button danger onClick={onLogout}>Log Out</Button>,
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
