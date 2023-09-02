import NavBar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Home.scss";
import Footer from "../../Components/Footer/Footer";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import ActionBar from "../../Components/ActionBar/ActionBar";
import {Files} from '../../Components/Files/Files';
import Loading from "../../Components/Loading/Loading";
import Fetcher from "../../Utils/Func/Fetcher";

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
		<div className="Home">
			<NavBar data={response.data} />
			<section id="Main">
				<div className="sidebar">
					<Sidebar data={response.data} />
				</div>
				<div className="content">
					<section id="home" className="home">
						<ActionBar />
						<div className="section-title">
                            <span>Home</span>
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
