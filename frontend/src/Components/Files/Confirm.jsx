import { Button, Modal } from "antd";

const Confirm = ({ title, open, onOk, onCancel, loading }) => {
	return (
		<Modal
			title={title}
			open={open}
			onOk={onOk}
			onCancel={onCancel}
			confirmLoading={loading}
            footer={[<Button type="primary" onClick={onCancel}>Cancel</Button>, <Button onClick={onOk} danger>Delete</Button>]}
		>
            <p>Do you really want to delete this data?</p>
        </Modal>
	);
};

export default Confirm