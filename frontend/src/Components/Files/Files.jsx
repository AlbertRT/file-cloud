import useSWR from "swr";
import Loader from "../Spinner/Spinner";
import DataCard from "./DataCard/DataCard";
import Fetcher from '../../Utils/Func/Fetcher'

export const Files = () => {

	const {
		data: files,
		isLoading,
		error,
	} = useSWR('http://localhost:5050/user/file', Fetcher.get);

	if (isLoading) {
		return <Loader />;
	}

	return <DataCard data={files.data} />;
};
