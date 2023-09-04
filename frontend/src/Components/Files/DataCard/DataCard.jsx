import { Image, Tooltip } from "@nextui-org/react";

const DataCard = ({ data }) => {
    const images = data.filter(({ mimetype }) => {return mimetype !== "folder"})

	return (
		<div className="overflow-y-auto">
			<div className="DataCards">
				<div className="w-full max-w-5xl p-5 pb-10 mx-auto mb-10 gap-5 columns-3 space-y-5">
					{images.map((img, key) => (
						<div className="item" key={key}>
							<Tooltip content={img.originalname}>
								<Image src={img.url} />
							</Tooltip>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default DataCard;
