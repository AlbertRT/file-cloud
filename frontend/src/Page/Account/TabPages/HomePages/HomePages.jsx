import React from "react";
import "./HomePages.scss";
import getGreetingMessage from '../../../../Utils/Helper/GreetingMessages';
import {Avatar, Button} from '@nextui-org/react';
import { Link } from "react-router-dom";

const HomePages = ({ data }) => {

	return (
		<div className="HomePages">
			<div className="hero">
				<Avatar
					isBordered
					color="secondary"
					src={data.profile_picture.downloadURL}
					className="w-24 h-24"
				/>
				<p>
					{getGreetingMessage()}, <b>{data.fullName}</b>
				</p>
                <span className="text-gray-500">{data?.username}</span>
                <div className="mt-8 flex justify-center">
                    <Link to="edit">
                        <Button variant="flat" color="default">
                            Edit Profile
                        </Button>
                    </Link>
                </div>
			</div>
		</div>
	);
};

export default HomePages;
