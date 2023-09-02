import { Link, useNavigate } from "react-router-dom";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Avatar,
} from "@nextui-org/react";
import axios from "axios";

const Account = ({ data }) => {
	const navigate = useNavigate();
	const onLogout = async () => {
		try {
			await axios.delete("http://localhost:5050/user/logout");
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};

	// const items = [
	// 	{
	// 		key: 1,
	// 		label: <Link to={`/account/${data.id}`}>View Account</Link>,
	// 	},
	// 	{
	// 		key: 2,
	// 		label: <Button danger onClick={onLogout}>Log Out</Button>,
	// 	},
	// ];
	return (
		<Dropdown>
			<DropdownTrigger>
				<Avatar
					src={data.profile_picture.downloadURL}
					isBordered
					color="secondary"
					size="sm"
					as="button"
					className="transition-transform ml-4"
				/>
			</DropdownTrigger>
			<DropdownMenu aria-label="Profile Actions" variant="flat">
				<DropdownItem key="my-profile">
					<Link to={`/account/${data.id}`}>
                        <p>My Profile</p>
                    </Link>
				</DropdownItem>
                <DropdownItem key="settings">
                    Settings
                </DropdownItem>
                <DropdownItem key="logout" onClick={onLogout} color="danger">
                    Log Out
                </DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default Account;
