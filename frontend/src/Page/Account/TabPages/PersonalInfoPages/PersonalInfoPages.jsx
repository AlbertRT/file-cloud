import React from "react";
import useSWR from "swr";
import Fetcher from "../../../../Utils/Helper/Fetcher";
import "./PersonalInfo.scss";
import BasicInfo from "./Components/BasicInfo";
import ContactInfo from "./Components/ContactInfo";
import AddressInfo from "./Components/AddressInfo";

const PersonalInfoPages = () => {
	const { data: response, error, isLoading } = useSWR(
		["http://localhost:5050/account/details"],
		Fetcher
	);
    if (isLoading) {
        return <div>Loading...</div>
    }

	return (
		<div className="PersonalInfo">
			<section className="hero">
				<div className="title">Personal Info</div>
				<div className="subtitle">
					Info about you, and your preferences
				</div>
			</section>
			<div className="info">
                <BasicInfo data={response.data.basic_info} />
                <ContactInfo data={response.data.contact_info} />
                <AddressInfo data={response.data.addresses} />
			</div>
		</div>
	);
};

export default PersonalInfoPages;
