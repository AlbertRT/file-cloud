import useSWR from "swr";
import axios from "axios";
import Loader from "../Spinner/Spinner";
import DataCard from "./DataCard/DataCard";
import { useLocation } from "react-router-dom";

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
		return <Loader />;
	}
	return <DataCard data={files.data} />;
};
