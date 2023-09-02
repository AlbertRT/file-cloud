import React from "react";
import { LuCog, LuHome, LuUser } from "react-icons/lu";
import HomePages from "./TabPages/HomePages/HomePages";
import PersonalInfoPages from "./TabPages/PersonalInfoPages/PersonalInfoPages";
import NavBar from "../../Components/Navbar/Navbar";
import useSWR from "swr";
import Fetcher from "../../Utils/Func/Fetcher";
import Loading from "../../Components/Loading/Loading";
import SettingsPages from "./TabPages/SettingsPages/SettingsPages";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "@nextui-org/react";

const Me = () => {
    const navigate = useNavigate()

	const {
		data: response,
		error,
		isLoading,
	} = useSWR("http://localhost:5050/user/me", Fetcher.get);
	if (isLoading) {
		return <Loading />
	}

	if (error) {
		navigate("/login");
	}

    document.title = 'Your Account'

	return (
		<div className="Me">
			<NavBar data={response.data} />
			<HomePages data={response.data} />
			<div className="p-10">
				<Tabs>
					<Tab title="Personal Info" key="personal-info">
						<PersonalInfoPages />
					</Tab>
					<Tab title="Settings" key="settings">
						<SettingsPages />
					</Tab>
				</Tabs>
			</div>
		</div>
	);
};

export default Me;
