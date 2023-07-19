import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Home.scss';

const Home = () => {
  return (
    <div className='Home'>
        <Navbar />
        <section id="Main">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="content"></div>
        </section>
    </div>
  )
}

export default Home