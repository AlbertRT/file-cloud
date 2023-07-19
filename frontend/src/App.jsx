import { Routes, Route } from 'react-router-dom';
import './index.scss';
import Home from './Page/Home/Home';

function App() {
	return (
        <div className="Apps">
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
