import { Space, Tabs } from "antd";
import React from "react";
import { LuCog, LuHome, LuUser } from "react-icons/lu";
import HomePages from "./TabPages/HomePages/HomePages";
import PersonalInfoPages from "./TabPages/PersonalInfoPages/PersonalInfoPages";
import Navbar from "../../Components/Navbar/Navbar";
import useSWR from "swr";
import Fetcher from "../../Utils/Helper/Fetcher";
import Loading from "../../Components/Loading/Loading";

const Me = () => {
	const {
		data: response,
		error,
		isLoading,
	} = useSWR(["http://localhost:5050/user/me", "get"], Fetcher, {
		revalidateOnMount: true,
		revalidateOnFocus: true,
		refreshInterval: 500,
	});
	if (isLoading) {
		return <Loading />
	}

	if (error) {
		navigate("/login");
	}

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
			children: <PersonalInfoPages />,
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
