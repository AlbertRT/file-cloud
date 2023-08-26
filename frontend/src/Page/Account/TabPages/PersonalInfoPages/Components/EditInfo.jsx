import {
	Button,
	Col,
	DatePicker,
	Input,
	Modal,
	Row,
	Select,
	notification,
} from "antd";
import "./EditInfo.scss";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const Edit = ({ open, onCancel, data }) => {
	if (!open) return;
	const [basicInfo, setBasicInfo] = useState([
		{
			fullName: data.basic_info.fullName,
			username: data.basic_info.username,
			gender: data.basic_info.gender,
			birthday: data.basic_info.birthday,
		},
	]);
	const [isLoading, setLoading] = useState(false);
	const [api, contextHolder] = notification.useNotification();
    const dateFormat = "YYYY/MM/DD";

	const onSave = async () => {
		setLoading(true);
		try {
			await axios.patch("http://localhost:5050/account/edit", {
				basicInfo: basicInfo[0],
			});
			setLoading(false);
			api.success({
				message: "Success",
				description: "Successfully update your profile!",
			});
			setTimeout(() => {
				onCancel();
			}, 1000);
		} catch (error) {
			api.error({
				message: "Something went wrong",
				description: error,
			});
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<Modal
			open={open}
			onCancel={onCancel}
			title={"Edit Your Personal Info"}
			footer={[
				<Button onClick={onCancel}>Cancel</Button>,
				<Button type="primary" onClick={onSave} loading={isLoading}>
					Save
				</Button>,
			]}
		>
			<section className="data">
				{contextHolder}
				<section className="basic_info">
					<div className="title">Basic Info</div>
					<div className="info">
						<Row gutter={16}>
							<Col span={12} key={1}>
								<div className="fullName">
									<label htmlFor="fullName">Full Name</label>
									<Input
										id="fullName"
										placeholder={data.basic_info.fullName}
										value={basicInfo[0].fullName}
										onChange={(e) =>
											setBasicInfo([
												{
													fullName: e.target.value,
													username:
														basicInfo[0].username,
													gender: basicInfo[0].gender,
													birthday:
														basicInfo[0].birthday,
												},
											])
										}
									/>
								</div>
							</Col>
							<Col span={12} key={2}>
								<div className="username">
									<label htmlFor="username">Username</label>
									<Input
										id="username"
										placeholder={data.basic_info.username}
										value={basicInfo[0].username}
										onChange={(e) => {
											setBasicInfo([
												{
													fullName:
														basicInfo[0].fullName,
													username: e.target.value,
													gender: basicInfo[0].gender,
													birthday:
														basicInfo[0].birthday,
												},
											]);
										}}
										autoComplete="off"
									/>
								</div>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={12} key={3}>
								<div className="gender">
									<label htmlFor="gender">Gender</label>
									<Select
										options={[
											{
												value: "Male",
												label: "Male",
											},
											{
												value: "Female",
												label: "Female",
											},
											{
												value: "null",
												label: "Rather not Say",
											},
										]}
										style={{ width: "200px" }}
										defaultValue={data.basic_info.gender}
										onChange={(value) => {
											setBasicInfo([
												{
													fullName:
														basicInfo[0].fullName,
													username:
														basicInfo[0].username,
													gender: value,
													birthday:
														basicInfo[0].birthday,
												},
											]);
										}}
									/>
								</div>
							</Col>
							<Col span={12} key={4}>
								<div className="birthday">
									<label htmlFor="fullName">Birthday</label>
									<DatePicker
										style={{ width: "200px" }}
										onChange={(date, dateString) => {
											setBasicInfo([
												{
													fullName:
														basicInfo[0].fullName,
													username:
														basicInfo[0].username,
													gender: basicInfo[0].gender,
													birthday: dateString,
												},
											]);
										}}
                                        format={dateFormat}
									/>
								</div>
							</Col>
						</Row>
					</div>
				</section>
			</section>
		</Modal>
	);
};

export default Edit;
