import { Table } from "antd";
import useSWR from "swr";
import Fetcher from "../../Utils/Fetcher";
import { Link, useLocation } from "react-router-dom";
import { LuFile, LuFolder, LuImage } from "react-icons/lu";
import moment from "moment";
import { formatBytes } from "../../Utils/DataConverter";

export const Files = () => {
	let { pathname } = useLocation();

	if (pathname === "/") {
		pathname = "root";
	}

	const {
		data: files,
		isLoading,
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
			render: (text) => <Link>{text}</Link>,
			sorter: (a, b) => a.age - b.age,
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

	const file = files.data.map((file, index) => {
		return {
			icon: file.mimetype !== "folder" ? <LuImage /> : <LuFolder />,
			name: file.originalName,
			size: file.size ? formatBytes(file.size) : "-",
			type: file.mimetype,
			date_modified: moment.unix(file.date_modified).format("DD MMM YYYY kk:mm"),
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
