import { Space, Drawer, Image } from "antd";
import { formatBytes } from "../../Utils/Helper/DataConverter";
import moment from "moment";
import { LuFolderOpen } from "react-icons/lu";
import useSWR from "swr";
import Spinner from "../Spinner/Spinner";
import Fetcher from "../../Utils/Helper/Fetcher";

const Properties = ({ open, onClose, data }) => {
	if (!data) return;
    let detailsUrl;

	if (data.type.toLowerCase() === "folder") {
		detailsUrl = `http://localhost:5050/user/file/folder/details/${data.key}`;
	} else {
		detailsUrl = `http://localhost:5050/user/file/details/${data.key}`;
	}

	const {
		data: properties,
		isLoading
	} = useSWR([detailsUrl], Fetcher);

	if (isLoading) {
		return <Spinner />;
	}


	return (
		<Drawer open={open} title="Details" onClose={onClose}>
			<Space direction="vertical">
				{properties.data.mimetype !== "folder" ? (
					<Image src={properties.data.url} preview={false} />
				) : (
					<div className="icon">
						<LuFolderOpen />
					</div>
				)}
				<div className="metadata">
					<div className="data">
						<p>Name</p>
						<span>{properties.data.originalname}</span>
					</div>
					<div className="data">
						<p>Type</p>
						<span>{properties.data.mimetype}</span>
					</div>
					{properties.data.mimetype !== "folder" && (
						<div className="data">
							<p>Size</p>
							<span>{formatBytes(properties.data.size)}</span>
						</div>
					)}
					<div className="data">
						<p>Modified</p>
						<span>
							{moment
								.unix(properties.data.date_modified)
								.format("DD/MM/YYYY hh:mm A")}
						</span>
					</div>
					<div className="data">
						<p>Author</p>
						<span>{properties.data.author}</span>
					</div>
				</div>
			</Space>
		</Drawer>
	);
};

export default Properties;
