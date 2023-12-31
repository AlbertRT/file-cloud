import React, { useState } from "react";
import {
	LuSearch
} from "react-icons/lu";
import Account from "./Account";
import { Link } from "react-router-dom";
import {Navbar, NavbarContent, Input, NavbarBrand} from "@nextui-org/react"
import useSWR from 'swr';
import Fetcher from '../../Utils/Func/Fetcher';

const NavBar = () => {
	const [searchValue, setSearchValue] = useState("");
    const {
		data,
		error,
		isLoading,
	} = useSWR("http://localhost:5050/account/details", Fetcher.get);
    if (isLoading) {
        return ""
    }
    const { basic_info } = data.data

	return (
		<Navbar isBordered isBlurred className="h-10 py-8">
			<NavbarContent justify="start">
				<NavbarBrand>
					<Link to={"/"}>Photos</Link>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent as="div" className="items-center" justify="end">
				<Input
					classNames={{
						base: "max-w-full sm:max-w-[10rem] h-10",
						mainWrapper: "h-full",
						input: "text-small",
						inputWrapper:
							"h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
					}}
					placeholder="Type to search..."
					size="sm"
					startContent={
						<div className="icons">
							<LuSearch />
						</div>
					}
					type="search"
				/>
				<Account data={basic_info} />
			</NavbarContent>
		</Navbar>
	);
};

export default NavBar;
