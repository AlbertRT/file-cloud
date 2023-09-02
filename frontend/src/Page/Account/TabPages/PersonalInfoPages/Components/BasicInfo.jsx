import "./Card.scss";
import { useState } from "react";
import ProfilePictureModal from "../../../../../Components/ProfilePictureModal/ProfilePicturesModal";
import { Avatar } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";

const BasicInfo = ({ data }) => {
	const photo_profile = data.profile_picture;
	const info = {
		fullName: data.fullName,
		username: data.username,
		birthday: data.birthday,
		gender: data.gender,
	};

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [ppChanging, setPPChanging] = useState(false);
    const [isEditing, setEditing] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    
	const onChangeProfilePictures = () => {
		setPPChanging(true);
	};

	return (
		<div className="accountInfo-card">
			<div className="card-header">
				<div className="card-title">Basic info</div>
			</div>
			<div className="card-body">
				<div className="data-display">
					<div className="display">
						<div className="title">Profile Pictures</div>
						<div className="data end">
							<Avatar
								isBordered
								color="secondary"
								src={photo_profile.downloadURL}
								onClick={onOpen}
                                as="button"
							/>
							<ProfilePictureModal
								isOpen={isOpen}
                                onOpenChange={onOpenChange}
                                onChangeProfilePictures={onChangeProfilePictures}
                                ppChanging={ppChanging}
                                data={data}
							/>
						</div>
					</div>
					{Object.keys(info).map((key) => (
						<div className="display" key={key}>
							<div className="title">{key}</div>
							<div className="data">
								<span>{info[key]}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BasicInfo;
