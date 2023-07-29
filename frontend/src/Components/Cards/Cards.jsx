import { Link } from "react-router-dom";
import "./Cards.scss";
import { LuFolder } from "react-icons/lu";

export const CardContainer = (props) => {
	return <div className="CardContainer">{props.children}</div>;
};

export const Card = ({ type }) => {
	return (
		<Link className={`Card ${type.toLowerCase()}`}>
			<div className="icons">
				<LuFolder />
			</div>
			<div className="name">My Folder</div>
		</Link>
	);
};
