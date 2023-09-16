import React, { useState } from "react";
import useSWR from "swr";
import Loading from "../../Components/Loading/Loading";
import Fetcher from "../../Utils/Func/Fetcher";
import NavBar from "../../Components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import DataCard from "../../Components/Files/DataCard/DataCard";
import {LuGlobe2, LuLock, LuEdit2 } from 'react-icons/lu';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch, useDisclosure, Textarea } from "@nextui-org/react";

const Board = () => {
	const { boardId } = useParams();
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [myBoard, setMyBoard] = useState({
        originalname: "",
        access: ""
    })

	const {
		data: response,
		error,
		isLoading,
	} = useSWR(
		`http://localhost:5050/user/file/board/ls/${boardId}`,
		Fetcher.get
	);
	if (isLoading) {
		return <Loading />;
	}
	const { board, files } = response.data
    document.title = `Board - ${board.originalname}`
    
	return (
		<div className="flex flex-col relative">
			<NavBar />
			<div className="my-4 px-10 flex items-center w-full justify-between">
				<div className="gap-4">
					<p className="text-[1.5rem] font-bold">
						{board.originalname}
					</p>
					<div className="flex items-center text-gray-400 select-none">
						<div className="flex items-center justify-center mr-1">
							{board.access === "private" ? (
								<LuLock />
							) : (
								<LuGlobe2 />
							)}
						</div>
						<p className="text-sm">{board.author}</p>
					</div>
				</div>
				<Button
					variant="bordered"
					size="sm"
					startContent={<LuEdit2 />}
					onPress={onOpen}
				>
					Edit
				</Button>
				<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
					<ModalContent>
						<ModalHeader>Edit Board</ModalHeader>
						<ModalBody>
							<div className="mb-4">
								<Input
									type="text"
									label="Name"
									labelPlacement="outside"
									placeholder={board.originalname}
									variant="bordered"
									value={myBoard.originalname}
									onChange={(e) =>
										setMyBoard((prev) => ({
											...prev,
											originalname: e.target.value,
										}))
									}
								/>
							</div>
                            <div className="mb-4">
                                <Textarea variant="bordered" label="Description" labelPlacement="outside" />
                            </div>
                            <Switch defaultSelected={board.access === "private"} size="sm">Make this Board private</Switch>
						</ModalBody>
						<ModalFooter>
							<div className="flex items-center justify-between w-full">
								<Button color="danger" variant="flat" size="sm">
									Delete this Board
								</Button>
								<Button
									color="success"
									variant="flat"
									size="sm"
								>
									Save
								</Button>
							</div>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</div>
			<DataCard data={files} />
		</div>
	);
};

export default Board;
