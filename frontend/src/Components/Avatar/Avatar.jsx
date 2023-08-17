import { Avatar } from "antd";

const UserAvatar = ({ src, size, onClick }) => {
    return <Avatar src={src.picture?.downloadURL} size={size} onClick={onClick}>{src.initial}</Avatar>
}

export default UserAvatar