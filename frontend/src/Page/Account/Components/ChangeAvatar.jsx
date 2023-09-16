import {
	Avatar,
	Button,
} from "@nextui-org/react";
import { useRef, useState } from "react";
import axios from 'axios'
import { revalidateLiveQueries } from '../../../Utils/Func/RevalidateLiveQueries' 

const ChangeAvatar = ({ picture }) => {
	const [file, setFile] = useState(null);
	const profilePictureInput = useRef(null);
	const [photoURL, setPhotoURL] = useState(null);
    const [isLoading, setLoading] = useState(false)

	const onChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
		if (selectedFile) {
			const blob = new Blob([selectedFile], { type: selectedFile.type });
			const url = URL.createObjectURL(blob);
			setPhotoURL(url);
		}
		onOpen();
	};

    const onSave = async () => {
        const fd = new FormData()
        fd.append("profile_picture", file);
        setLoading(true)
        try {
            await axios.post(
				"http://localhost:5050/account/edit/profile_pictures",
                fd
			);

            await revalidateLiveQueries()
            setFile(null)
            setPhotoURL(null)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

	return (
		<>
			<Avatar
				src={photoURL ? photoURL : picture}
				size="lg"
				isBordered
				color="secondary"
			/>
			{photoURL ? (
				<div className="flex ml-5 gap-2">
                    <Button size="sm" variant="flat" color="danger" onPress={() => setPhotoURL(null)}>Remove</Button>
                    <Button size="sm" variant="solid" color="secondary" onPress={onSave} isLoading={isLoading}>Save</Button>
                </div>
			) : (
				<Button
					variant="flat"
					className="ml-5"
					size="sm"
					onClick={() => profilePictureInput.current.click()}
				>
					Change
				</Button>
			)}
			<input
				type="file"
				name="profilePicture"
				ref={profilePictureInput}
				className="hidden"
				onChange={onChange}
			/>
		</>
	);
};

export default ChangeAvatar;
