import { Result } from "antd"

const Error = ({error}) => {
    const { data, status } = error.response
    document.title = `Error - ${status}`

    return (
		<div className="Error" style={{ width :'100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<Result
				status={"error"}
				title={data.msg}
				subTitle={`Status ${status}`}
			/>
		</div>
	);
}

export default Error