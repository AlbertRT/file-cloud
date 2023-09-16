import {
	Button,
	Card,
	CardFooter,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Image,
	User,
} from "@nextui-org/react";
import { formatStr } from "../../../Utils/Helper/String";
import {
	LuDownload,
	LuInfo,
	LuMoreVertical,
	LuShare,
	LuTrash,
} from "react-icons/lu";
import downloadFile from "../../../Utils/Func/DownloadFile";
import deleteData from "../../../Utils/Func/DeleteData";
import share from '../../../Utils/Func/Share'

const DataCard = ({ data }) => {
	const images = data.filter(({ mimetype }) => {
		return mimetype !== "folder";
	});

	return (
		<div className="w-full max-w-fit p-5 pb-10 mx-4 mb-10 gap-4 columns-4 space-y-2">
			{images.map((img, key) => (
				<Card key={key} radius="lg" className="border-none shadow-none">
					<Image src={img.url} removeWrapper />
					<CardFooter className="block">
						<p className="text-sm select-none font-bold mb-2">
							{img.title
								? formatStr(img.title)
								: formatStr(img.originalname)}
						</p>
						<div className="flex justify-between items-center">
							<p className="text-sm select-none text-gray-500 font-bold">{img.author}</p>
							<Dropdown>
								<DropdownTrigger>
									<Button isIconOnly size="sm">
										<LuMoreVertical />
									</Button>
								</DropdownTrigger>
								<DropdownMenu variant="flat">
									<DropdownItem
										key="share"
										startContent={<LuShare />}
										onClick={() => share(img.id, img.mimetype)}
									>
										Share
									</DropdownItem>
									<DropdownItem
										key="download"
										startContent={<LuDownload />}
										onClick={() => downloadFile(img.id)}
										aria-label="download"
									>
										Download
									</DropdownItem>
									<DropdownItem
										key="info"
										startContent={<LuInfo />}
									>
										File Info
									</DropdownItem>
									<DropdownItem
										key="delete"
										startContent={<LuTrash />}
										color="danger"
										className="text-danger"
										onClick={() => deleteData(img)}
									>
										Delete
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					</CardFooter>
				</Card>
			))}
		</div>
	);
};

export default DataCard;
