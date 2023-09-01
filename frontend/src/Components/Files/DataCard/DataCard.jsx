import {Empty, Image, Space, message} from 'antd';
import {LuFolder, LuImage, LuDownload, LuInfo, LuTextCursorInput, LuTrash, LuLink} from 'react-icons/lu';
import {formatStr} from '../../../Utils/Helper/String';
import { Link, useLocation, useParams } from "react-router-dom";
import {CardVerticalMenu} from '../../VerticalMenu/VerticalMenu';
import {useState} from 'react';
import deleteData from '../../../Utils/Func/DeleteData';
import downloadFile from '../../../Utils/Func/DownloadFile';
import Properties from '../Properties';
import Confirm from '../Confirm';
import Rename from '../Rename';
import "./DataCard.scss";
import share from '../../../Utils/Func/Share';

const DataCard = ({ data }) => {
	const [open, setOpen] = useState(false);
	const [openConfirmDelete, setConfirmDelete] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [selectedData, setSelectedData] = useState(null);
	const [renameBox, setOpenRenameBox] = useState(false);
    const [messageApi, contextHolder] = message.useMessage()

	const { pathname } = useLocation();
	const { folderName } = useParams();

	if (data.length === 0) {
		return <Empty />;
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

	const items = [
		{
			key: "1",
			label: (
				<Space>
					<LuDownload /> Download
				</Space>
			),
			onClick: (event) => {
				event.data.mimetype !== "folder" && downloadFile(event.data);
                downloadFile(event.data)
			},
		},
		{
			key: "2",
			label: (
				<Space>
					<LuTextCursorInput /> Rename
				</Space>
			),
			onClick: (event) => {
				setSelectedData(event.data);
				openRenameBox();
			},
		},
		{
			key: "3",
			label: (
				<Space>
					<LuLink /> Share URL
				</Space>
			),
			onClick: (event) => {
				const msg = share(event.data.id, event.data.mimetype)
                messageApi.open({
                    type: "success",
                    content: msg
                })
			},
		},
		{
			key: "4",
			label: (
				<Space>
					<LuInfo /> Properties
				</Space>
			),
			onClick: (event) => {
				setSelectedData(event.data);
				setOpen(true);
			},
		},
		{
			key: "5",
			label: (
				<Space>
					<LuTrash /> Delete
				</Space>
			),
			danger: true,
			onClick: (event) => {
				confirm()
                setSelectedData(event.data)
			},
		},
	];

	return (
		<div className="DataCardsDisplayContainer">
            {contextHolder}
			<div className="DataCards">
				<div className="Container">
					{data
						.filter(({ mimetype }) => {
							return mimetype === "folder";
						})
						.map((data) => (
							<div className="Card folder" key={data.id}>
								<div className="Head">
									<div className="title">
										<Link
											to={
												!folderName
													? `/folder/${data.name}`
													: `${pathname}/${data.name}`
											}
										>
											<div className="icons">
												<LuFolder />
											</div>
											<span>{data.originalname}</span>
										</Link>
									</div>
									<div className="menus">
										<CardVerticalMenu
											items={items}
											data={data}
										/>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
			<div className="DataCards">
				<div className="section_title">
					<span>Files</span>
				</div>
				<div className="Container">
					{data
						.filter(({ mimetype }) => {
							return mimetype !== "folder";
						})
						.map((data) => (
							<div className="Card file" key={data.id}>
								<div className="Head">
									<div className="title">
										<div className="icons">
											<LuImage />
										</div>
										{formatStr(data.originalname, 18)}
									</div>
									<div className="menus">
										<CardVerticalMenu
											items={items}
											data={data}
										/>
									</div>
								</div>
								<div className="Body">
									<div className="Preview">
										<Image src={data.url} preview />
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
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
		</div>
	);
};

export default DataCard;