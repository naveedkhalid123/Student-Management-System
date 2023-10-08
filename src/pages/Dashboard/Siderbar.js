import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Sidebar.css'; // Create a CSS file for custom styling
import { Link } from 'react-router-dom';

// layout

//import { Layout } from 'antd';



function Sidebar() {
    return (
      
                    <nav id="sidebar">
                        <div className="sidebar-header">
                            {/* <h3><img src='https://images.app.goo.gl/5mk4kUq1SEmjDvvc9'/>SMIT Student Portal</h3> */}

                            <h3> <img height="40px" className='rounded-5' src='data:image/png;base64,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' alt='SMIT Logo' /> SMIT Student Portal</h3>
                        </div>
                        <ul >
                            <li>
                                <Link to="/students" className='nav-link'>Students</Link>

                            </li>
                            <li>
                                <Link to="/courses" className='nav-link'>Courses</Link>
                            </li>
                            <li>
                                <Link to="/attendance" className='nav-link'>Attendance</Link>
                            </li>
                            <li>
                                <Link to="/statistics" className='nav-link'>Statistics</Link>
                            </li>
                        </ul>
                    </nav>
          
    );
}

export default Sidebar;



