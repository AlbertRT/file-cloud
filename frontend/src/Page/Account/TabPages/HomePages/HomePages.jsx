import { Avatar, Modal } from "antd";
import React, { useState } from "react";
import pp from "../../../../Assets/20230718_151947.jpg";
import "./HomePages.scss";
import PPHome from "./Components/PPHome";
import ChangePP from "./Components/ChangePP/ChangePP";
import UserAvatar from "../../../../Components/Avatar/Avatar";

const HomePages = ({ data }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [ppChanging, setPPChanging] = useState(false);

	const onCancel = () => {
		setIsModalOpen(false);
		setPPChanging(false);
	};
	const openModal = () => {
		setIsModalOpen(true);
	};

	const onChangeProfilePictures = () => {
		setPPChanging(true);
	};

	return (
		<div className="HomePages">
			<div className="hero">
				<UserAvatar
					src={{
						initial: data.fullName.split("")[0],
						picture: data.profile_picture,
					}}
					size={170}
					onClick={openModal}
				/>
				<Modal
					open={isModalOpen}
					onCancel={onCancel}
					footer={[]}
					title="Your Profile Picture"
				>
					{!ppChanging ? (
						<PPHome
							data={{
								fullName: data.fullName,
								profile_picture: data.profile_pictures,
							}}
							onClick={onChangeProfilePictures}
						/>
					) : (
						<ChangePP />
					)}
				</Modal>
				<p>
					Welcome back, <b>{data.fullName}</b>
				</p>
				<span className="subtitle">Manage your info</span>
			</div>
		</div>
	);
};

export default HomePages;
