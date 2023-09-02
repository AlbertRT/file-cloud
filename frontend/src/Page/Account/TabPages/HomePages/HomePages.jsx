import React, { useState } from "react";
import "./HomePages.scss";
import ProfilePictureModal from "../../../../Components/ProfilePictureModal/ProfilePicturesModal";
import getGreetingMessage from '../../../../Utils/Helper/GreetingMessages';
import {Avatar, useDisclosure} from '@nextui-org/react';

const HomePages = ({ data }) => {
	const [ppChanging, setPPChanging] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const onChangeProfilePictures = () => {
		setPPChanging(true);
	};

	return (
		<div className="HomePages">
			<div className="hero">
				<Avatar
					isBordered
					color="secondary"
					src={data.profile_picture.downloadURL}
					className="w-24 h-24"
					onClick={onOpen}
				/>
				<ProfilePictureModal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
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
