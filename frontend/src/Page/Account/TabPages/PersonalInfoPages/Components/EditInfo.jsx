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
	const [basicInfo, setBasicInfo] = useState({
		fullName: data.basic_info.fullName,
		username: data.basic_info.username,
		gender: data.basic_info.gender,
		birthday: data.basic_info.birthday,
	});
    const [contactInfo, setContactInfo] = useState({
        email: data.contact_info.email,
        phone: data.contact_info.phone
    })

	const [isLoading, setLoading] = useState(false);
	const [api, contextHolder] = notification.useNotification();
    const dateFormat = "YYYY/MM/DD";

	const onSave = async () => {
		setLoading(true);
		try {
			await axios.patch("http://localhost:5050/account/edit", {
				basicInfo,
                contactInfo
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
										value={basicInfo.fullName}
										onChange={(e) =>
											setBasicInfo({
												fullName: e.target.value,
												username: basicInfo.username,
												gender: basicInfo.gender,
												birthday: basicInfo.birthday,
											})
										}
										autoComplete="off"
									/>
								</div>
							</Col>
							<Col span={12} key={2}>
								<div className="username">
									<label htmlFor="username">Username</label>
									<Input
										id="username"
										value={basicInfo.username}
										onChange={(e) => {
											setBasicInfo({
												fullName: basicInfo.fullName,
												username: e.target.value,
												gender: basicInfo.gender,
												birthday: basicInfo.birthday,
											});
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
											setBasicInfo({
												fullName: basicInfo.fullName,
												username: e.target.value,
												gender: basicInfo.gender,
												birthday: basicInfo.birthday,
											});
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
											setBasicInfo({
												fullName: basicInfo.fullName,
												username: basicInfo.username,
												gender: basicInfo.gender,
												birthday: dateString,
											});
										}}
										format={dateFormat}
									/>
								</div>
							</Col>
						</Row>
					</div>
				</section>
				<section className="contact_info">
					<div className="title">Contact Info</div>
					<div className="info">
						<Row gutter={16}>
							<Col span={12}>
								<div className="email">
									<label htmlFor="email">Email</label>
									<Input
										id="email"
										value={contactInfo.email}
										onChange={(e) =>
											setContactInfo({
												email: e.target.value,
												phone: contactInfo.phone,
											})
										}
										autoComplete="off"
									/>
								</div>
							</Col>
							<Col span={12}>
								<div className="phone">
									<label htmlFor="phone">Phone Number</label>
									<Input
										id="phone"
										value={contactInfo.phone}
										onChange={(e) =>
											setContactInfo({
												email: contactInfo.email,
												phone: e.target.value,
											})
										}
										autoComplete="off"
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
