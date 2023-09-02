import NavBar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Footer from "../../Components/Footer/Footer";
import ActionBar from "../../Components/ActionBar/ActionBar";
import { Files } from "../../Components/Files/Files";
import useSWR from "swr";
import Fetcher from "../../Utils/Func/Fetcher";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

const Folder = () => {
	const navigate = useNavigate();

	const {
		data: response,
		error,
		mutate,
		isLoading,
	} = useSWR("http://localhost:5050/user/me", Fetcher.get, {
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
	return (
		<div className="Folder">
			<NavBar data={response.data} />
			<section id="Main">
				<div className="sidebar">
					<Sidebar data={response.data} />
				</div>
				<div className="content">
					<section id="folder" className="folder">
						<ActionBar />
						<div className="section-title">
                            <span>Folder</span>
                        </div>
						<Files />
					</section>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Folder;
