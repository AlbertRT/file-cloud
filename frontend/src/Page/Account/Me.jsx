import React from "react";
import NavBar from "../../Components/Navbar/Navbar";
import useSWR from "swr";
import Fetcher from "../../Utils/Func/Fetcher";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "@nextui-org/react";
import Board from "./TabPages/BoardPages/Boards";
import AboutMe from "./Components/AboutMe"

const Me = () => {
    const navigate = useNavigate()

	const {
		data: response,
		error,
		isLoading,
	} = useSWR("http://localhost:5050/account/details", Fetcher.get);
	if (isLoading) {
		return <Loading />
	}

	if (error) {
		navigate("/login");
	}

    document.title = 'Your Account'

	return (
		<div className="Me">
			<NavBar />
			<AboutMe data={response.data.basic_info} />
			<div className="mt-8 p-10">
                <Tabs variant="underlined" className="flex justify-center" disabledKeys={['friends']}>
                    <Tab key="board" title="Board">
                        <Board />
                    </Tab>
                    <Tab key="friends" title="Friends" >

                    </Tab>
                </Tabs>
            </div>
		</div>
	);
};

export default Me;
