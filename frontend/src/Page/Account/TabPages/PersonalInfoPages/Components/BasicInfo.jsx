import "./Card.scss";
import UserAvatar from "../../../../../Components/Avatar/Avatar";
import { useState } from "react";
import ProfilePictureModal from "../../../../../Components/ProfilePictureModal/ProfilePicturesModal";
import { Button, Input } from "antd";
import { LuEdit3 } from "react-icons/lu";

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
    
    const onEditing = () => {
        setEditing(true)
    }
    const onNotEditing = () => {
        setEditing(false)
    }
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
		<div className="accountInfo-card">
			<div className="card-header">
				<div className="card-title">Basic info</div>
			</div>
			<div className="card-body">
				<div className="data-display">
					<div className="display">
						<div className="title">Profile Pictures</div>
						<div className="data end">
							<UserAvatar
								src={{
									initial: data.fullName.charAt(0),
									picture: photo_profile,
								}}
								onClick={openModal}
								size={50}
							/>
							<ProfilePictureModal
								open={isModalOpen}
								onCancel={onCancel}
								onChangeProfilePictures={
									onChangeProfilePictures
								}
								ppChanging={ppChanging}
								data={data}
							/>
						</div>
					</div>
					{Object.keys(info).map((key) => (
						<div className="display" key={key}>
							<div className="title">{key}</div>
							<div className="data">
								<div className="value">
									<Input value={info[key]} readOnly />
								</div>
								<div className="Edit">
									<Button>
										<LuEdit3 />
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BasicInfo;
