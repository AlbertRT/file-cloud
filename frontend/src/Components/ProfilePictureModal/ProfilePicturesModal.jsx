import { Modal } from "antd";
import PPHome from "./Components/PPHome";
import ChangePP from "./Components/ChangePP/ChangePP";
const ProfilePictureModal = ({open, onCancel, ppChanging, onChangeProfilePictures, data}) => {
	return (
		<Modal
			open={open}
			onCancel={onCancel}
			footer={[]}
			title="Your Profile Picture"
		>
			{!ppChanging ? (
				<PPHome
					data={{
						fullName: data.fullName,
						profile_picture: data.profile_picture,
					}}
					onClick={onChangeProfilePictures}
				/>
			) : (
				<ChangePP />
			)}
		</Modal>
	);
};

export default ProfilePictureModal;
