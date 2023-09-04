import Loader from '../Spinner/Spinner'

const Loading = () => {
    const styles = {
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
    return <div className="Loading" style={styles}>
        <Loader />
    </div>
}

export default Loading