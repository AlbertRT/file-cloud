import { Space, Table, Button, Dropdown } from "antd";
import useSWR from "swr";
import Fetcher from "../../Utils/Fetcher";
import { Link, useLocation } from "react-router-dom";
import { LuFile, LuFolder, LuImage, LuMoreVertical } from "react-icons/lu";
import { formatBytes } from "../../Utils/DataConverter";
import axios from "axios";
import formatUnixDate from '../../Utils/FormatDate';
import formatStr from "../../Utils/FormatString";
import ImagePreview from './ImagePreview';

export const Files = () => {
	let { pathname } = useLocation();

	if (pathname === "/") {
		pathname = "root";
	}

	const { data: files, isLoading, mutate } = useSWR(
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

	// actions
	const deleteData = async (record) => {
		const id = record.key;
        let url;

        if (record.type !== 'folder') {
            url = "http://localhost:5050/user/file/delete";
        } else {
            url = "http://localhost:5050/user/file/folder/delete";
        }

        try {
            await axios.delete(url, { data: { id } });
            mutate();
        } catch (error) {
            console.log(error);
        }
	};
    const downloadFile = async (record) => {
        const url = `http://localhost:5050/download/file/${record.key}`;
        const urlParts = url.split("/");
		const filename = urlParts[urlParts.length - 1];

		const downloadLink = document.createElement("a");
		downloadLink.href = url;
		downloadLink.download = filename;

		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
		downloadLink.click();
        downloadLink.remove()
	};

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
            width: "10%"
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
										(() =>
											item.onClick({ item, record })),
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

	const file = files.data.map((file, index) => {
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
		<Table
			dataSource={dataSource}
			columns={columns}
			scroll={{
				y: 340,
			}}
			size="small"
            pagination={false}
		/>
	);
};
