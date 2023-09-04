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
} from "@nextui-org/react";
import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";

const Board = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isPublic, setPublic] = useState(false);
	const [boardName, setBoardName] = useState("");

    const makeBoard = async () => {}

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
						{(onClose) => (
							<>
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
											onChange={(e) => setBoardName(e.target.value)}
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
										disabled={
											boardName === ""
										}
									>
										Create
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</div>
			<div className="grid grid-cols-5" aria-label="boards">
				Boards
			</div>
		</div>
	);
};

export default Board;
