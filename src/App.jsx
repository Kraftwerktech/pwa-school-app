import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const MainLayout = lazy(() => import('./layout/MainLayout'));
const TeacherDashboard = lazy(() => import('./views/Teacher/Dashboard/TeacherDashboard'));

const  Teacherlogin = lazy(() => import('./views/Auth/teacherLogin'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route 
  path="/teacher/dashboard" 
  element={
   
      <MainLayout role="Teacher" />

  }
>
          <Route index element={<TeacherDashboard  />} />
          
        </Route>
       
        <Route path="/" element={<Teacherlogin />} />
       
      </Routes>

    </BrowserRouter>
  );
}

export default App;
