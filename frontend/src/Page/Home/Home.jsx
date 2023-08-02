import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Home.scss";
import Footer from "../../Components/Footer/Footer";
import useSWR from "swr";
import Fetcher from "../../Utils/Fetcher";
import { useNavigate } from 'react-router-dom';
import { CardContainer, Card } from "../../Components/Cards/Cards";
import ActionBar from "../../Components/ActionBar/ActionBar";

const Home = () => {
    const navigate = useNavigate();

	const { data: response, error, mutate, isLoading } = useSWR(
		["http://localhost:5050/user/me", "get"],
		Fetcher,
		{
			revalidateOnMount: true,
		}
	);
	if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        navigate('/login');
    }

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
						<CardContainer
							position={"flex"}
							sectionTitle={"Suggest"}
						>
							<Card type={"folder"} name={"My Folder"} />
							<Card
								type={"image"}
								size={"small"}
								name={"Bali.jpg"}
							/>
						</CardContainer>
						<CardContainer
							position={"grid"}
							sectionTitle={"Recent"}
						>
							<Card type={"image"} name={"jkt.png"} />
							<Card type={"image"} name={"jkt.png"} />
							<Card type={"image"} name={"jkt.png"} />
							<Card type={"image"} name={"jkt.png"} />
							<Card type={"image"} name={"jkt.png"} />
						</CardContainer>
					</section>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Home;
