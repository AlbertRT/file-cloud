import { Button, Card, Col, Empty, Image, Row, Space } from "antd";
import {
	LuFolder,
	LuImage,
	LuMoreVertical,
} from "react-icons/lu";
import { formatStr } from "../../Utils/Helper/String";
import {Link, useLocation, useParams} from 'react-router-dom';

const DataCard = ({ data }) => {
	const { pathname } = useLocation();
    const { folderName } = useParams();

    if (data.length === 0) {
        return <Empty />
    }

	const Title = ({ name, type }) => {
		return (
			<Row justify={"space-between"} align={"middle"}>
				<Col>
					<Space>
						{type === "folder" ? <LuFolder /> : <LuImage />}
						{type === "folder" ? (
							<Link
								to={
									!folderName
										? `/folder/${name.name}`
										: `${pathname}/${name.name}`
								}
							>
								{name.originalname}
							</Link>
						) : (
							formatStr(name.originalname)
						)}
					</Space>
				</Col>
				<Col>
					<Button type="default">
						<LuMoreVertical />
					</Button>
				</Col>
			</Row>
		);
	};
	return (
		<Row gutter={16}>
			{data.map((data) => (
				<Col span={8} key={data.id}>
					<Card
						title={
							<Title
								name={{
									originalname: data.originalname,
									name: data?.name,
								}}
								type={data.mimetype}
							/>
						}
						hoverable={true}
					>
						{data.mimetype === "image" && (
							<Col align="middle">
								<Image
									src={data.url}
									height={200}
									preview={false}
								/>
							</Col>
						)}
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default DataCard;
