import NavBar from "../../Components/Navbar/Navbar";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import { Files } from "../../Components/Files/Files";
import Loading from "../../Components/Loading/Loading";
import Fetcher from "../../Utils/Func/Fetcher";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	Switch,
	User,
	useDisclosure,
} from "@nextui-org/react";
import { LuPlus } from "react-icons/lu";
import axios from "axios";
import { useState } from "react";

const Home = () => {
	const navigate = useNavigate();
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [boards, setBoards] = useState([]);
	const [altText, setAltText] = useState("");
	const [imageTItle, setImageTitle] = useState("");
	const [location, setLocation] = useState("");
	const [isPublic, setPublic] = useState(false);

	const {
		data: response,
		error,
		isLoading,
	} = useSWR("http://localhost:5050/account/details", Fetcher.get);
	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		console.log(error);
		navigate("/login");
	}
	const { basic_info } = response.data;
	document.title = `Drive - ${basic_info.fullName}`;

	const getBoardList = async () => {
		try {
			const { data: res } = await axios.get(
				"http://localhost:5050/user/board/ls"
			);
			setBoards(res.data);
		} catch (error) {
			console.log(error);
		}
	};
	const onUpload = async () => {
		let access;
		!isPublic ? (access = "private") : (access = "public");
		const data = {
			imageTItle,
			altText,
			location,
			access,
		};
		console.log(data);
	};

	return (
		<div className="flex flex-col relative">
			<NavBar data={response.data.basic_info} />
			<section id="Main" className="flex flex-col">
				<div className="px-8 py-4">
					<span className="font-bold">Home</span>
				</div>
				<div className="mt-2">
					<Files />
				</div>
			</section>
			<Button
				className="fixed bottom-[5%] right-[5%]"
				isIconOnly
				color="primary"
				variant="shadow"
				onPress={() => {
					onOpen();
					getBoardList();
				}}
			>
				<div className="flex justify-center items-center">
					<LuPlus />
				</div>
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				scrollBehavior="inside"
				size="3xl"
			>
				<ModalContent>
					<ModalHeader>Upload your Photos</ModalHeader>
					<ModalBody>
						<div className="flex justify-end w-full">
							<Select
								label="Save to Board?"
								labelPlacement="outside"
								className="w-60"
								placeholder="Select Board"
								onChange={(e) => setLocation(e.target.value)}
							>
								{boards.map((board) => (
									<SelectItem
										value={board.directory}
										key={board.directory}
									>
										{board.originalname}
									</SelectItem>
								))}
							</Select>
						</div>
						<div className="flex mt-4">
							<div className="flex-[0.6] mr-6">
								<input type="file" className="bg-none border outline-none w-full" />
							</div>
							<div className="flex-1">
								<div className="mb-4">
									<Input
										type="text"
										variant="bordered"
										placeholder="Add title to your image"
										isClearable
										size="lg"
										value={imageTItle}
										onChange={(e) =>
											setImageTitle(e.target.value)
										}
									/>
								</div>
								<div className="mb-4">
									<p className="text-sm mb-3 select-none font-semibold text-gray-400">
										Author
									</p>
									<User
										name={basic_info.fullName}
										description={basic_info?.username}
										avatarProps={{
											src: basic_info?.profile_picture
												.downloadURL,
										}}
									/>
								</div>
								<div className="mb-4">
									<p className="text-sm mb-3 select-none font-semibold text-gray-400">
										Alt Text
									</p>
									<Input
										type="text"
										variant="bordered"
										placeholder="Add alt text to your image"
										isClearable
										value={altText}
										onChange={(e) =>
											setAltText(e.target.value)
										}
									/>
								</div>
								<Switch onValueChange={setPublic}>
									Make your Public
								</Switch>
							</div>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button
							variant="flat"
							color="primary"
							onClick={onUpload}
						>
							Upload
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default Home;
