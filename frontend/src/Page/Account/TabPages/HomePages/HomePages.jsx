import React, { useState } from "react";
import "./HomePages.scss";
import UserAvatar from "../../../../Components/Avatar/Avatar";
import ProfilePictureModal from "../../../../Components/ProfilePictureModal/ProfilePicturesModal";
import getGreetingMessage from '../../../../Utils/Helper/GreetingMessages';

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
				<ProfilePictureModal
					open={isModalOpen}
					onCancel={onCancel}
					onChangeProfilePictures={onChangeProfilePictures}
                    ppChanging={ppChanging}
                    data={data}
				/>
				<p>
					{getGreetingMessage()}, <b>{data.fullName}</b>
				</p>
				<span className="subtitle">Manage your info</span>
			</div>
		</div>
	);
};

export default HomePages;
