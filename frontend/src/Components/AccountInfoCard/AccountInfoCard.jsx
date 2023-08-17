import "./AccountInfoCard.scss";

const AccountInfoCard = ({ title, data, key }) =>{
    return <div className="accountInfo-card">
		<div className="card-header">
			<div className="card-title">{title}</div>
		</div>
		<div className="card-body">
			<div className="data-display">
				<div className="display" key={key}>
					<div className="title">{key}</div>
					<div className="data">{data[key]}</div>
				</div>
			</div>
		</div>
	</div>;
}

export default AccountInfoCard