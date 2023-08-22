import { Space } from 'antd';
import downloadFile from '../../Utils/Func/DownloadFile';
import { LuDownload, LuInfo, LuTextCursorInput, LuTrash } from 'react-icons/lu';
const items = [
		{
			key: "1",
			label: <Space><LuDownload /> Download</Space>,
			onClick: (event) => {
				event.type !== "folder" && downloadFile(event.record);
			},
		},
		{
			key: "2",
			label: <Space><LuTextCursorInput/> Rename</Space>,
			onClick: (event) => {
				setSelectedData(event.record);
				openRenameBox();
			},
		},
		{
			key: "3",
			label: <Space><LuInfo /> Properties</Space>,
			onClick: (event) => {
				setSelectedData(event.record);
				setOpen(true);
			},
		},
		{
			key: "4",
			label: <Space><LuTrash /> Delete</Space>,
			danger: true,
			onClick: (event) => {
				confirm();
				setSelectedData(event.record);
			},
		},
	];

    export default items