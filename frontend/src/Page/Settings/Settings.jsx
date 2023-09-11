import React, { useState } from "react";
import NavBar from "../../Components/Navbar/Navbar";
import useSWR from "swr";
import Fetcher from "../../Utils/Func/Fetcher";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { LuMoon, LuPalette, LuUser } from "react-icons/lu";
import { Accordion, AccordionItem, Button, Chip, Select, SelectItem, Switch } from "@nextui-org/react";

const Settings = () => {
	const navigate = useNavigate();

	const {
		data: response,
		error,
		isLoading,
	} = useSWR("http://localhost:5050/account/details", Fetcher.get);
	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		navigate("/login");
	}
	return (
		<div className="Setting">
			<NavBar data={response.data.basic_info} />
			<div className="p-8">
				<p className="select-none text-lg font-bold">Settings</p>
			</div>
			<div className="px-8 mt-4">
				<div className="mb-4">
					<div className="mb-3">
						<p className="text-sm font-semibold select-none">
							Theme
						</p>
					</div>
					<div className="w-1/2 flex select-none mb-4">
						<div className="flex-[0.5] flex items-center justify-between">
							<div className="flex items-center">
								<div className="flex items-center justify-center mr-4">
									<LuPalette />
								</div>
								Theme
							</div>
							<Chip size="sm" className="ml-4" color="primary">
								<p className="text-sm">Upcoming</p>
							</Chip>
						</div>
						<div className="flex-1 flex items-center justify-end">
							<Select
								className="w-1/2"
								placeholder="Select theme"
								label="Select theme"
								isDisabled
							>
								<SelectItem value="next-ui" key="next-ui">
									Next UI
								</SelectItem>
								<SelectItem value="modern" key="modern">
									Modern
								</SelectItem>
							</Select>
						</div>
					</div>
					<div className="w-1/2 h-10 flex select-none mb-8">
						<div className="flex-[0.5] flex items-center justify-between">
							<div className="flex items-center">
								<div className="flex items-center justify-center mr-4">
									<LuMoon />
								</div>
								Dark Mode
							</div>
							<Chip size="sm" className="ml-4" color="primary">
								<p className="text-sm">Upcoming</p>
							</Chip>
						</div>
						<div className="flex-1 flex items-center justify-end">
							<Switch isDisabled />
						</div>
					</div>
				</div>
				<div className="mb-4">
					<div className="mb-3">
						<p className="text-sm font-semibold select-none">
							Account
						</p>
					</div>
					<div className="w-1/2 h-10 flex select-none mb-8">
						<div className="flex-[0.5] flex items-center justify-between">
							<div className="flex items-center">
								<div className="flex items-center justify-center mr-4">
									<LuUser />
								</div>
								Delete your Account
							</div>
						</div>
						<div className="flex-1 flex items-center justify-end">
							<Button color="danger" variant="flat">Delete Account</Button>
						</div>
					</div>
				</div>
				<div className="mb-4">
					<div className="mb-3">
						<p className="text-sm font-semibold select-none">
							About
						</p>
					</div>
					<div className="w-full">
                        <Accordion variant="shadow" isCompact>
                            <AccordionItem title='Photos' subtitle='&copy; 2023'>
                                <p className="text-sm select-none mb-4">Version: <b>0.0.3 alpha</b></p>
                            </AccordionItem>
                        </Accordion>
                    </div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
