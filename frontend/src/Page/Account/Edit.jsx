import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Fetcher from "../../Utils/Func/Fetcher";
import Loading from "../../Components/Loading/Loading";
import NavBar from "../../Components/Navbar/Navbar";
import {
	Avatar,
	Button,
	Chip,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import moment from "moment";
import axios from "axios";
import { revalidateLiveQueries } from "../../Utils/Func/RevalidateLiveQueries";
import { useNavigate } from "react-router-dom";
import ChangeAvatar from "./Components/ChangeAvatar";

function isDisabled(basic_info) {
    return (
		basic_info.fullName !== "" &&
		basic_info.username !== "" &&
		basic_info.gender !== "" &&
		basic_info.birthday !== null
	);
}

const Edit = () => {
	document.title = "Edit your Account";
	const navigate = useNavigate();
	const [isLoading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true)
	const [user, setUser] = useState({
		basic_info: {
			fullName: "",
			username: "",
			gender: "",
			birthday: null,
		}
	});
	const { data: response, error } = useSWR(
		"http://localhost:5050/account/details",
		Fetcher.get
	);
    useEffect(() => {
		const { basic_info } = user;
		const isBasicInfoIncomplete =
			basic_info.fullName !== "" ||
			basic_info.username !== "" ||
			basic_info.gender !== "" ||
			basic_info.birthday !== null;

		setDisabled(!isBasicInfoIncomplete);
	}, [user]);


	const onInputChange = (e) => {
		const label = e.target.getAttribute("aria-label");
		const name = e.target.name;
		const value = e.target.value;
		setUser((prev) => ({
			...prev,
			[label]: {
				...prev[label],
				[name]: value,
			},
		}));
	};
	const onGenderChange = (e) => {
		const value = e.target.value;
		setUser((prev) => ({
			...prev,
			basic_info: {
				...prev.basic_info,
				gender: value,
			},
		}));
	};
	const onBirthdayChange = (e) => {
		setUser((prev) => ({
			...prev,
			basic_info: {
				...prev.basic_info,
				birthday: e,
			},
		}));
	};
	const onSave = async () => {
		setLoading(true);
        
        const data = {
            basic_info: {
                fullName: user.basic_info.fullName || response.data.basic_info.fullName,
                username: user.basic_info.username || response.data.basic_info.username,
                gender: user.basic_info.gender || response.data.basic_info.gender,
                birthday: user.basic_info.birthday || response.data.basic_info.birthday
            }
        }
		try {
			await axios.patch("http://localhost:5050/account/edit", {
				...data,
			});
			setUser({
				basic_info: {
					fullName: "",
					username: "",
					gender: "",
					birthday: null,
				}
			});
            await revalidateLiveQueries()
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const genders = [
		{
			key: "male",
			val: "Male",
		},
		{
			key: "female",
			val: "Female",
		},
		{
			key: "rather-not-to-say",
			val: "Rather not to Say",
		},
	];

	return (
		<>
			{!response ? (
				<Loading />
			) : (
				<>
					<NavBar data={response.data.basic_info} />
					<div className="mt-4 px-10">
						<p className="text-lg font-bold select-none">
							Edit your Profile
						</p>
					</div>
					<div className="px-10 w-[40%]">
						<div className="mt-10 flex items-center">
							<ChangeAvatar
								picture={
									response.data.basic_info.profile_picture
										.downloadURL
								}
							/>
						</div>
						<div className="mt-10">
							<div className="mt-4">
								<Input
									type="text"
									variant="bordered"
									label="Full Name"
									labelPlacement="outside"
									placeholder={
										response.data.basic_info.fullName
									}
									name="fullName"
									value={user.basic_info.fullName}
									onChange={onInputChange}
									aria-label="basic_info"
                                    autoComplete="off"
								/>
							</div>
							<div className="mt-4">
								<Input
									type="text"
									variant="bordered"
									label="Username"
									labelPlacement="outside"
									placeholder={
										response.data.basic_info.username
									}
									name="username"
									value={user.basic_info.username}
									onChange={onInputChange}
									aria-label="basic_info"
                                    autoComplete="off"
								/>
							</div>
							<div className="mt-4 flex items-center">
								<div className="mr-5">
									<p className="text-sm select-none font-medium mb-2">
										Birthday
									</p>
									<Popover placement="top">
										<PopoverTrigger>
											<Button variant="flat">
												{!user.basic_info.birthday
													? "Pick a Date"
													: `${moment(
															user.basic_info
																.birthday
													  ).format(
															"MMMM, DD YYYY"
													  )}`}
											</Button>
										</PopoverTrigger>
										<PopoverContent>
											<DayPicker
												mode="single"
												selected={
													user.basic_info.birthday
												}
												onSelect={onBirthdayChange}
											/>
										</PopoverContent>
									</Popover>
								</div>
								<div className="ml-5 w-full">
									<div className="w-auto">
										<Select
											label="Gender"
											labelPlacement="outside"
											placeholder="Select Gender"
											defaultSelectedKeys={[
												response.data.basic_info.gender.toLowerCase(),
											]}
											onChange={onGenderChange}
										>
											{genders.map((gender) => (
												<SelectItem
													key={gender.key}
													textValue={gender.val}
												>
													{gender.val}
												</SelectItem>
											))}
										</Select>
									</div>
								</div>
							</div>
						</div>
						<div className="my-10 flex items-center gap-4">
							<Button variant="bordered" color="secondary">
								Discard
							</Button>
							<Button
								color="secondary"
								variant="solid"
								isDisabled={disabled}
								isLoading={isLoading}
								onClick={onSave}
							>
								Save
							</Button>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Edit;