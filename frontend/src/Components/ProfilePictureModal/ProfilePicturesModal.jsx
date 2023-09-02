import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Button } from "@nextui-org/react";
import PPHome from "./Components/PPHome";
import ChangePP from "./Components/ChangePP/ChangePP";
const ProfilePictureModal = ({
	isOpen,
	onOpenChange,
	ppChanging,
	onChangeProfilePictures,
    data
}) => {
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Change your profile pictures
						</ModalHeader>
						<ModalBody>
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
						</ModalBody>
                        <ModalFooter>
                            
                        </ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default ProfilePictureModal;
