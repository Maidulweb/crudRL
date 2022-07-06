import React from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import '../../assets/admin/css/styles.css'
import 'https://use.fontawesome.com/releases/v6.1.0/js/all.js';
import '../../assets/admin/js/scripts';
import Navbar from '../../components/admin/Navbar';
import Sideber from '../../components/admin/Sideber';
import Footer from '../../components/admin/Footer';

const MasterLayout = () => {
    return (
            <div className="sb-nav-fixed">
                
               <Navbar />
               <div id="layoutSidenav">
                <Sideber />
                <div id="layoutSidenav_content">
                    <main>
                    <Outlet />
                    </main>
                    
                    <Footer />
                </div>
               </div>
            </div>
    );
};

export default MasterLayout;