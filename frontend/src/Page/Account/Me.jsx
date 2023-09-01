import { Space, Tabs } from "antd";
import React from "react";
import { LuCog, LuHome, LuUser } from "react-icons/lu";
import HomePages from "./TabPages/HomePages/HomePages";
import PersonalInfoPages from "./TabPages/PersonalInfoPages/PersonalInfoPages";
import Navbar from "../../Components/Navbar/Navbar";
import useSWR from "swr";
import Fetcher from "../../Utils/Func/Fetcher";
import Loading from "../../Components/Loading/Loading";
import SettingsPages from "./TabPages/SettingsPages/SettingsPages";
import { useNavigate } from "react-router-dom";

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

	const items = [
		{
			key: 1,
			label: (
				<Space>
					<LuHome /> Home
				</Space>
			),
			children: <HomePages data={response.data} />,
		},
		{
			key: 2,
			label: (
				<Space>
					<LuUser /> Personal Info
				</Space>
			),
			children: <PersonalInfoPages />,
		},
		{
			key: 3,
			label: (
				<Space>
					<LuCog /> Settings
				</Space>
			),
			children: <SettingsPages />,
		},
	];
	return (
		<div className="Me">
			<Navbar data={response.data} />
			<Tabs items={items} defaultActiveKey="1" tabPosition="left" />
		</div>
	);
};

export default Me;
