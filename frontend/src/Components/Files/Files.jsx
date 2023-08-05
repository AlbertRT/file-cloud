import { Space, Table, Button, Image } from "antd";
import useSWR from "swr";
import Fetcher from "../../Utils/Fetcher";
import { Link, useLocation } from "react-router-dom";
import { LuFile, LuFolder, LuImage } from "react-icons/lu";
import moment from "moment";
import { formatBytes } from "../../Utils/DataConverter";
import { useState } from "react";

export const Files = () => {
	let { pathname } = useLocation();
	const [visible, setVisible] = useState(false);

	if (pathname === "/") {
		pathname = "root";
	}

	const { data: files, isLoading } = useSWR(
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
	];

	// Image
	const ImagePreview = ({ preview, name }) => {
		return (
			<>
				<Button type="text" onClick={() => setVisible(true)}>{name}</Button>
				<Image
					src={preview}
                    style={{ display: "none" }}
					preview={{
						visible,
						src: preview,
						onVisibleChange: (val) => {
							setVisible(val);
						},
					}}
				/>
			</>
		);
	};

	const file = files.data.map((file, index) => {
		return {
			icon: file.mimetype !== "folder" ? <LuImage /> : <LuFolder />,
			name:
				file.mimetype.split("/")[0] === "image" ? (
					<ImagePreview preview={file.url} name={file.originalName} />
				) : (
					<Link>{file.originalName}</Link>
				),
			size: file.size ? formatBytes(file.size) : "-",
			type: file.mimetype,
			date_modified: moment
				.unix(file.date_modified)
				.format("DD MMM YYYY hh:mm A"),
			key: file.id,
		};
	});
	const dataSource = [...file];
	return (
		<Table
			dataSource={dataSource}
			columns={columns}
			scroll={{
				y: 240,
			}}
			size="small"
		/>
	);
};
