import { Space, Table, Button, Dropdown, Drawer, Image } from "antd";
import useSWR from "swr";
import { Link, useLocation } from "react-router-dom";
import { LuFile, LuFolder, LuImage, LuMoreVertical } from "react-icons/lu";
import { formatBytes } from "../../Utils/Helper/DataConverter";
import formatUnixDate from "../../Utils/Helper/FormatDate";
import formatStr from "../../Utils/Helper/FormatString";
import ImagePreview from "./ImagePreview/ImagePreview";
import { useState } from "react";
import downloadFile from "../../Utils/Func/DownloadFile";
import deleteData from "../../Utils/Func/DeleteData";
import Fetcher from '../../Utils/Helper/Fetcher';
import './File.scss';
import Properties from "./Properties";

export const Files = () => {
	const [open, setOpen] = useState(false);
    const [properties, setProperties] = useState(null)
	let { pathname } = useLocation();

	if (pathname === "/") {
		pathname = "root";
	}

	const {
		data: files,
		isLoading,
		mutate,
	} = useSWR(
		[`http://localhost:5050/user/file/${pathname}`, "get"],
		Fetcher,
		{
			revalidateOnMount: true,
			revalidateOnFocus: true,
			refreshInterval: 500,
		}
	);

	if (isLoading) {
		return <div>Loading..</div>;
	}

	// properties
    const onClose = () => {
        setOpen(false);
        setProperties(null);
    }

	const items = [
		{
			key: "1",
			label: "Download",
			onClick: (event) => {
				downloadFile(event.record);
			},
		},
		{
			key: "2",
			label: "Properties",
			onClick: async (event) => {
                try {
                    const {data} = await Fetcher([`http://localhost:5050/user/file/details/${event.record.key}`, 'get']);
                    setProperties(data);
                } catch (error) {
                    console.log(error);
                }

                setOpen(true);
            },
		},
		{
			key: "3",
			label: "Delete",
			danger: true,
			onClick: (event) => {
				deleteData(event.record);
			},
		},
	];

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
		},
		{
			title: "Author",
			dataIndex: "author",
			key: "author",
			width: "10%",
		},
		{
			title: "",
			dataIndex: "action",
			key: "action",
			width: 100,
			fixed: "right",
			render: (text, record) => {
				return (
					<Space>
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
					</Space>
				);
			},
		},
	];

	const file = files.data.map((file) => {
		return {
			icon: file.mimetype !== "folder" ? <LuImage /> : <LuFolder />,
			name:
				file.mimetype.split("/")[0] === "image" ? (
					<Space>
						<ImagePreview
							preview={file.url}
							name={formatStr(file.originalName)}
						/>
					</Space>
				) : (
					<Space>
						<Link>{file.originalName}</Link>
					</Space>
				),
			size: file.size ? formatBytes(file.size) : "-",
			type: file.mimetype,
			date_modified: formatUnixDate(file.date_modified),
			author: file.author,
			key: file.id,
			url: file.url,
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
            <Properties open={open} onClose={onClose} properties={properties} />
		</>
	);
};
