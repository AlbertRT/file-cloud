import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Home.scss';
import Footer from '../../Components/Footer/Footer';

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
        <Footer />
    </div>
  )
}

export default Home