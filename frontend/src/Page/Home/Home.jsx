import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Home.scss";
import Footer from "../../Components/Footer/Footer";
import useSWR from "swr";
import Fetcher from "../../Utils/Helper/Fetcher";
import { useNavigate } from "react-router-dom";
import ActionBar from "../../Components/ActionBar/ActionBar";
import {Files} from '../../Components/Files/Files';
import Loading from "../../Components/Loading/Loading";
import ChangeView from "../../Components/ChangeView/ChangeView";

const Home = () => {
    const navigate = useNavigate();
    
	const {
		data: response,
		error,
		mutate,
		isLoading,
	} = useSWR(["http://localhost:5050/user/me", "get"], Fetcher, {
		revalidateOnMount: true,
		revalidateOnFocus: true,
        refreshInterval: 500
	});
	if (isLoading) {
		return <Loading />
	}
    
	if (error) {
		navigate("/login");
	}
    document.title = `Drive - ${response.data.fullName}`
    
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
						<div className="section-title">
                            <span>Home</span>
                            <ChangeView />
                        </div>
						<Files />
					</section>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Home;
