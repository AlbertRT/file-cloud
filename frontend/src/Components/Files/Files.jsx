import { Space, Table, Button, Dropdown } from "antd";
import useSWR, { mutate } from "swr";
import { Link, useLocation, useParams } from "react-router-dom";
import {
	LuFile,
	LuFolder,
	LuImage,
	LuUnlock,
	LuLock,
	LuDownload,
	LuInfo,
	LuTextCursorInput,
	LuTrash,
} from "react-icons/lu";
import { formatBytes } from "../../Utils/Helper/DataConverter";
import formatUnixDate from "../../Utils/Helper/FormatDate";
import "./File.scss";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import DataCard from "./DataCard/DataCard";
import Fetcher from "../../Utils/Func/Fetcher";

export const Files = () => {
	let { pathname } = useLocation();

	const fetcher = async (url) => {
		const {data} = await axios.get(url, { params: { pathname } });
		return data;
	};

	const {
		data: files,
		isLoading,
		error,
	} = useSWR('http://localhost:5050/user/file', fetcher);

	if (isLoading) {
		return <Spinner />;
	}
	return <DataCard data={files.data} />;
};
