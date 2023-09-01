import React, { useState } from "react";
import useSWR from "swr";
import Fetcher from "../../../../Utils/Func/Fetcher";
import "./PersonalInfo.scss";
import BasicInfo from "./Components/BasicInfo";
import ContactInfo from "./Components/ContactInfo";
import Loading from "../../../../Components/Loading/Loading";
import { Button, Space } from "antd";
import { LuEdit3 } from "react-icons/lu";
import Edit from "./Components/EditInfo";

const PersonalInfoPages = () => {
    const [isEditing, setEdit] = useState(false)

	const { data: response, error, isLoading } = useSWR(
		"http://localhost:5050/account/details",
		Fetcher.get
	);
    if (isLoading) {
        return <Loading />
    }
    const setEditing = () => {
        setEdit(true)
    }
    const onCancel = () => {
        setEdit(false)
    }
 
	return (
		<div className="PersonalInfo">
			<section className="hero">
				<div className="title">Personal Info</div>
				<div className="subtitle">
					Info about you, and your preferences
				</div>
				<div className="actions">
					<ul>
						<li>
							<Button onClick={setEditing}>
								<Space>
									<div className="icons">
										<LuEdit3 />
									</div>
									Edit Your Personal Info
								</Space>
							</Button>
						</li>
					</ul>
				</div>
			</section>
			<div className="info">
				<BasicInfo data={response.data.basic_info} />
				<ContactInfo data={response.data.contact_info} />
			</div>
            <Edit open={isEditing} onCancel={onCancel} data={response.data} />
		</div>
	);
};

export default PersonalInfoPages;
