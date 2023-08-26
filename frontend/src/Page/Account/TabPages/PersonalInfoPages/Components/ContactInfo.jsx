import { Button, Input } from "antd";
import { LuChevronRight, LuEdit3 } from "react-icons/lu";
import "./Card.scss";

const ContactInfo = ({ data }) => {
	return (
		<div className="accountInfo-card">
			<div className="card-header">
				<div className="card-title">Contact info</div>
			</div>
			<div className="card-body">
				<div className="data-display">
					{Object.keys(data).map((key) => (
						<div className="display" key={key}>
							<div className="title">{key}</div>
							<div className="data">
								<span>{data[key]}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ContactInfo;
