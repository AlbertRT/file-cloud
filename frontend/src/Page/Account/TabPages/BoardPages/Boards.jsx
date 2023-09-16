import {
	Button,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Input,
	Switch,
    Card,
    CardFooter,
    CardBody,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import React, { useState } from "react";
import { LuMoreVertical, LuPlus } from "react-icons/lu";
import axios from 'axios'
import { revalidateLiveQueries } from '../../../../Utils/Func/RevalidateLiveQueries'
import useSWR from 'swr'
import Fetcher from '../../../../Utils/Func/Fetcher'
import { formatStr } from "../../../../Utils/Helper/String";
import { Link } from "react-router-dom";
import Loader from "../../../../Components/Spinner/Spinner";
import {timeFromX} from '../../../../Utils/Helper/FormatDate';

const Board = () => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [isPublic, setPublic] = useState(false);
	const [boardName, setBoardName] = useState("");
    const [isLoading, setLoading] = useState(false)

    const { data: boards, error, isLoading: dataLoading } = useSWR('http://localhost:5050/user/board/ls', Fetcher.get)

    if (dataLoading) {
        return <Loader />
    }

    const makeBoard = async () => {
        setLoading(true)
        let access

        isPublic ? access = 'public' : access = 'private'
        try {
            await axios.post("http://localhost:5050/user/board/create", {
                name: boardName,
                access
            });
            await revalidateLiveQueries()
            setLoading(false)
            setBoardName("")
            setPublic(false)
            onClose()
        } catch (error) {
            console.log(error);
        }
    }
    const onDelete = (id) => {
        alert(id)
    }

	return (
		<div className="Board">
			<div aria-label="action-bar" className="mb-4 flex justify-end">
				<Button
					isIconOnly
					color="primary"
					variant="flat"
					onPress={onOpen}
				>
					<div className="flex justify-center items-center">
						<LuPlus />
					</div>
				</Button>
				<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
					<ModalContent>
						<ModalHeader className="flex flex-col gap-1">
							Create Board
						</ModalHeader>
						<ModalBody>
							<div className="my-4">
								<Input
									type="text"
									variant="bordered"
									placeholder={`for example "My Favorite Cars"`}
									value={boardName}
									onChange={(e) =>
										setBoardName(e.target.value)
									}
									isClearable
									onClear={() => setBoardName("")}
								/>
							</div>
							<Switch
								isSelected={isPublic}
								onValueChange={setPublic}
							>
								Make this Board Public
							</Switch>
						</ModalBody>
						<ModalFooter>
							<Button
								color="primary"
								variant="flat"
								disabled={boardName === ""}
								isLoading={isLoading}
								onClick={makeBoard}
							>
								Create
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</div>
			<div className="grid grid-cols-5 gap-5" aria-label="boards">
				{boards.data.map((board) => (
					<Card isBlurred key={board.id}>
						<CardBody className="block">
							<div className="flex justify-between items-center w-full">
								<Link
									to={`/board/${board.id}`}
								>
									<p className="font-bold">
										{formatStr(board.originalname)}
									</p>
								</Link>
							</div>
							<div className="flex items-center w-full select-none justify-between mt-2">
								<p className="text-tiny">{board.author}</p>
								<p className="text-tiny text-gray-500">
									{timeFromX(board.date_modified)}
								</p>
							</div>
						</CardBody>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Board;
