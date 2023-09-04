import NavBar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import {Files} from '../../Components/Files/Files';
import Loading from "../../Components/Loading/Loading";
import Fetcher from "../../Utils/Func/Fetcher";
import { Button } from "@nextui-org/react";
import { LuPlus } from "react-icons/lu";

const Home = () => {
    const navigate = useNavigate();

	const {
		data: response,
		error,
		isLoading,
	} = useSWR('http://localhost:5050/user/me', Fetcher.get);
	if (isLoading) {
		return <Loading />
	}

	if (error) {
        console.log(error);
		navigate("/login");
	}
    document.title = `Drive - ${response.data.fullName}`

	return (
		<div className="flex flex-col h-screen relative">
			<NavBar data={response.data} />
			<section id="Main" className="flex flex-col">
				<div className="px-8 py-4">
					<span className="font-bold">Home</span>
				</div>
				<div className="mt-2">
					<Files />
				</div>
			</section>
            <Button className="fixed bottom-[5%] right-[5%]" isIconOnly color="primary" variant="shadow">
                <div className="flex justify-center items-center">
                    <LuPlus />
                </div>
            </Button>
		</div>
	);
};

export default Home;
