import { Card, CardBody, CardFooter, CardHeader, Image, Tooltip, User } from "@nextui-org/react";
import {formatStr} from "../../../Utils/Helper/String"

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
						<User
							avatarProps={{
								size: "sm",
                                src: img.author.photo
							}}
							name={img.author.name}
						/>
					</CardFooter>
				</Card>
			))}
		</div>
	);
};

export default DataCard;
