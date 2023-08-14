import { Modal } from "antd";

const Confirm = ({ title, open, onOk, onCancel, loading }) => {
	return (
		<Modal
			title={title}
			open={open}
			onOk={onOk}
			onCancel={onCancel}
			confirmLoading={loading}
		>
            <p>Do you really want to delete this data?</p>
        </Modal>
	);
};

export default Confirm