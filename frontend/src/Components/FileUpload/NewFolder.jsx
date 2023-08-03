import { Input } from "antd";

const NewFolder = ({ onInput, folderName }) => {
	return (
		<div className="NewFolder">
			<Input
				placeholder="New Folder"
				value={folderName}
				onInput={onInput}
			/>
		</div>
	);
};

export default NewFolder;
