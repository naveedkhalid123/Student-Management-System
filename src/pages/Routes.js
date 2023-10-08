import React from 'react'

import {Routes, Route, Navigate} from 'react-router-dom';
import Students from './Dashboard/Students/index';
import Courses from './Dashboard/Courses/Courses';
import Attendance from './Dashboard/Attendance/Attendance';
import Statistics from './Dashboard/Statistics/Statistics';

export default function Index() {
  return (
    <>
 < div style={{paddingLeft: '250px'}}>
 
 
    <Routes>
        <Route path='/students' element={<Students/>} />
        <Route path='/courses' element={<Courses/>} />
        <Route path='/attendance' element={<Attendance/>} />
        <Route path='/statistics' element={<Statistics/>}/>
    </Routes>  

    </div>

    </>
  )
}
