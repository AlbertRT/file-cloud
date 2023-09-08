import { Link, useNavigate } from "react-router-dom";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	DropdownSection,
	Avatar,
	User,
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
	return (
		<Dropdown showArrow>
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
			<DropdownMenu
				aria-label="Profile Actions"
				variant="flat"
				disabledKeys={["profile"]}
			>
				<DropdownSection showDivider>
					<DropdownItem
						key="profile"
						isReadOnly
						className="opacity-100"
					>
						<User
							name={data.fullName}
							description={data?.username}
							avatarProps={{
								size: "sm",
								src: data.profile_picture.downloadURL,
							}}
						/>
					</DropdownItem>
				</DropdownSection>
				<DropdownItem key="my-profile">
					<Link to={`/account`}>
						<p>My Profile</p>
					</Link>
				</DropdownItem>
				<DropdownItem key="settings">
                    <Link to={'/app/settings'}>
                        <p>Settings</p>
                    </Link>
                </DropdownItem>
				<DropdownItem key="logout" onClick={onLogout} color="danger">
					Log Out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default Account;
