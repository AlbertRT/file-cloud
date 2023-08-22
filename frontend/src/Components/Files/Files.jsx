import { Space, Table, Button, Dropdown } from "antd";
import useSWR from "swr";
import { Link, useLocation, useParams } from "react-router-dom";
import {
	LuFile,
	LuFolder,
	LuImage,
	LuMoreVertical,
	LuUnlock,
	LuLock,
} from "react-icons/lu";
import { formatBytes } from "../../Utils/Helper/DataConverter";
import formatUnixDate from "../../Utils/Helper/FormatDate";
import ImagePreview from "./ImagePreview/ImagePreview";
import { useState } from "react";
import deleteData from "../../Utils/Func/DeleteData";
import "./File.scss";
import Properties from "./Properties";
import axios from "axios";
import Confirm from "./Confirm";
import Rename from "./Rename";
import { formatStr, toUpperCase } from "../../Utils/Helper/String";
import Spinner from "../Spinner/Spinner";
import items from "./DropdownCol";

export const Files = () => {
	const [open, setOpen] = useState(false);
	const [openConfirmDelete, setConfirmDelete] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [selectedData, setSelectedData] = useState(null);
	const [renameBox, setOpenRenameBox] = useState(false);

	let { pathname } = useLocation();
	const { folderName } = useParams();

	const fetcher = async (url) => {
		const data = await axios.get(url, { params: { pathname } });
		return data;
	};

	const {
		data: files,
		isLoading,
		error,
	} = useSWR(`http://localhost:5050/user/file`, fetcher, {
		revalidateOnMount: true,
		revalidateOnFocus: true,
		refreshInterval: 300,
	});

	if (isLoading) {
		return <Spinner />;
	}

	// *properties
	const onClose = () => {
		setOpen(false);
		setSelectedData(null);
	};

	// * delete confirm
	const onCancel = () => {
		setConfirmDelete(false);
		setSelectedData(null);
	};
	const onOk = async () => {
		setDeleting(true);
		try {
			deleteData(selectedData);
			setDeleting(false);
			onCancel();
		} catch (error) {
			console.log(error);
			setDeleting(false);
			setSelectedData(null);
		}
	};
	const confirm = () => {
		setConfirmDelete(true);
	};

	// * rename
	const openRenameBox = () => {
		setOpenRenameBox(true);
	};
	const closeRenameBox = () => {
		setOpenRenameBox(false);
		setSelectedData(null);
	};

	

	// tables
	const columns = [
		{
			title: <LuFile />,
			dataIndex: "icon",
			key: "icon",
			width: "5%",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "",
			dataIndex: "action",
			key: "action",
			width: "6%",
			render: (text, record) => (
				<Dropdown
					menu={{
						items: items.map((item) => ({
							...item,
							onClick:
								item.onClick &&
								(() => item.onClick({ item, record })),
						})),
					}}
					trigger={"click"}
				>
					<Button type="text">
						<LuMoreVertical />
					</Button>
				</Dropdown>
			),
		},
		{
			title: "Size",
			dataIndex: "size",
			key: "size",
			width: "10%",
		},
		{
			title: "Type",
			dataIndex: "type",
			key: "type",
			width: "10%",
		},
		{
			title: "Date Modified",
			dataIndex: "date_modified",
			key: "date_modified",
			width: "25%",
		},
		{
			title: "Author",
			dataIndex: "author",
			key: "author",
			width: "10%",
		},
		{
			title: "Access",
			dataIndex: "access",
			key: "access",
			width: "10%",
		},
	];

	const file = files.data.data.map((file) => {
		return {
			icon: file.mimetype !== "folder" ? <LuImage /> : <LuFolder />,
			name:
				file.mimetype.split("/")[0] === "image" ? (
					<Space>
						<ImagePreview
							preview={file.url}
							name={formatStr(file.originalname)}
						/>
					</Space>
				) : (
					<Space>
						<Link
							to={
								!folderName
									? `/folder/${file.name}`
									: `${pathname}/${file.name}`
							}
						>
							{file.originalname}
						</Link>
					</Space>
				),
			size: file.size ? formatBytes(file.size) : "-",
			type: toUpperCase(file.mimetype),
			date_modified: formatUnixDate(file.date_modified),
			author: file.author,
			access: (
				<Space>
					{file.access !== "private" ? <LuUnlock /> : <LuLock />}
					{toUpperCase(file.access)}
				</Space>
			),
			key: file.id,
		};
	});

	const dataSource = [...file];
	return (
		<>
			<Table
				dataSource={dataSource}
				columns={columns}
				scroll={{
					y: 340,
				}}
				size="small"
				pagination={false}
			/>
			<Properties
				open={open}
				onClose={onClose}
				key={1}
				data={selectedData}
			/>
			<Confirm
				open={openConfirmDelete}
				onCancel={onCancel}
				onOk={onOk}
				loading={deleting}
				title={"Delete?"}
				key={2}
			/>
			<Rename
				open={renameBox}
				data={selectedData}
				cancel={closeRenameBox}
				key={3}
			/>
		</>
	);
};
