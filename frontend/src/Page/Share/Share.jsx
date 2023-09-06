import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Fetcher from "../../Utils/Func/Fetcher";
import Spinner from "../../Components/Spinner/Spinner";
import {
	LuDownload,
	LuFolder,
	LuImage,
	LuLink2,
	LuPanelRightOpen,
} from "react-icons/lu";
import "./Share.scss";
import { formatStr } from "../../Utils/Helper/String";
import downloadFile from "../../Utils/Func/DownloadFile";
import Error from "./components/Error"
import share from "../../Utils/Func/Share";

const Share = () => {
	const { type, id } = useParams();
    
	const {
		data: response,
		isLoading,
		error,
	} = useSWR(
		`http://localhost:5050/share/details/${type}/${id}`,
		Fetcher.get
	);

	if (isLoading) return <Spinner />;
    if (error) {
        return <Error error={error} />
    }
    
	const { data } = response;
    document.title = data.originalname


	return (
		<div className="Share">
			{/* <div className="Bar">
				<div className="Buttons_Groups">
					<div className="copy_url">
						<Button type="text" onClick={shareURL}>
							<Space>
								<div className="icons">
									<LuLink2 />
								</div>
								Copy Link
							</Space>
						</Button>
					</div>
					<div className="download">
						<Button type="text" onClick={() => downloadFile(data)}>
							<Space>
								<div className="icons">
									<LuDownload />
								</div>
								Download
							</Space>
						</Button>
					</div>
				</div>
				<div className="File_Name">
					<Space>
						<div className="icons">
							{data.mimetype !== "folder" ? (
								<LuImage />
							) : (
								<LuFolder />
							)}
						</div>
						<div className="name">
							<span>{formatStr(data.originalname)}</span>
						</div>
					</Space>
				</div>
			</div>
			<div className="Preview">
				<div className={`type ${data.mimetype}`}>
					{data.mimetype === "image" ? (
						<img src={data.url} alt="" />
					) : (
						<div></div>
					)}
				</div>
			</div> */}
		</div>
	);
};

export default Share;
