import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Home.scss";
import Footer from "../../Components/Footer/Footer";
import useSWR from "swr";
import Fetcher from "../../Utils/Fetcher";
import { useNavigate } from "react-router-dom";
import { CardContainer, Card } from "../../Components/Cards/Cards";
import ActionBar from "../../Components/ActionBar/ActionBar";
import { Table } from "antd";

const Home = () => {
	const navigate = useNavigate();

	const {
		data: response,
		error,
		mutate,
		isLoading,
	} = useSWR(["http://localhost:5050/user/me", "get"], Fetcher, {
		revalidateOnMount: true,
	});
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		navigate("/login");
	}

	const dataSource = [
		{
			key: "1",
			name: "Mike",
			age: 32,
			address: "10 Downing Street",
		},
		{
			key: "2",
			name: "John",
			age: 42,
			address: "10 Downing Street",
		},
	];

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Age",
			dataIndex: "age",
			key: "age",
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address",
		},
	];

	return (
		<div className="Home">
			<Navbar data={response.data} />
			<section id="Main">
				<div className="sidebar">
					<Sidebar data={response.data} />
				</div>
				<div className="content">
					<section id="home" className="home">
						<ActionBar />
						<div className="section-title">Home</div>
						<Table
							dataSource={dataSource}
							columns={columns}
							scroll={{
								y: 240,
							}}
						/>
					</section>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Home;
