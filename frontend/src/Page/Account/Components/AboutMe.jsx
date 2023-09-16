import React from "react";
import getGreetingMessage from '../../../Utils/Helper/GreetingMessages';
import {Avatar, Button} from '@nextui-org/react';
import { Link } from "react-router-dom";

const AboutMe = ({ data }) => {

	return (
		<div className="mt-4">
			<div className="w-full flex items-center flex-col">
				<Avatar
					isBordered
					color="secondary"
					src={data.profile_picture.downloadURL}
					className="w-24 h-24"
				/>
				<p className="mt-4 text-[1.4rem]">
					{getGreetingMessage()}, <b>{data.fullName}</b>
				</p>
                <span className="text-gray-500">{data?.username}</span>
                <div className="mt-8 flex justify-center">
                    <Button variant="flat">
                        <Link to={'edit'}>Edit Profile</Link>
                    </Button>
                </div>
			</div>
		</div>
	);
};

export default AboutMe;
