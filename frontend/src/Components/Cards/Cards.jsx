import { Link } from "react-router-dom";
import "./Cards.scss";
import { LuFolder, LuImage } from "react-icons/lu";

export const CardContainer = ({ children, position, sectionTitle }) => {
	return (
		<div className={`CardContainer ${position}`}>
			{sectionTitle ? (<div className="title">{sectionTitle}</div>) : ("")}
            <div className={position}>
                {children}
            </div>
		</div>
	);
};

export const Card = ({ type, size, name, url }) => {
	return (
		<Link className={`Card ${type.toLowerCase()} ${size}`}>
			<div className="icons">
				{type.toLowerCase() !== "folder" ? <LuImage /> : <LuFolder />}
			</div>
			<div className="name">{name}</div>
		</Link>
	);
};
