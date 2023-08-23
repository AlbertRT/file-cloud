import { Button, Dropdown } from "antd";
import { LuMoreVertical } from "react-icons/lu";
const VerticalMenu = ({ record, items }) => {
	return (
		<Dropdown
			menu={{
				items: items.map((item) => ({
					...item,
					onClick:
						item.onClick && (() => item.onClick({ item, record })),
				})),
			}}
			trigger={"click"}
		>
			<Button type="text">
				<LuMoreVertical />
			</Button>
		</Dropdown>
	);
};

export default VerticalMenu;

export const CardVerticalMenu = ({ items, data }) => {
	return (
		<Dropdown
			menu={{
				items: items.map((item) => ({
					...item,
					onClick:
						item.onClick && (() => item.onClick({ item, data })),
				})),
			}}
            trigger={"click"}
		>
			<button>
				<LuMoreVertical />
			</button>
		</Dropdown>
	);
};
