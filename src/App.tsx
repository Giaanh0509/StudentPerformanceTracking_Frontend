import React from 'react';
import { SignUp } from './components/pages/SignUp';
import { Login } from './components/pages/LogIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard } from './components/pages/Dashborad';
import { Layout } from './components/pages/Layout';


function App() {
  return (
    <Router> 
      <Routes>
        <Route index element={<Layout></Layout>} />
        <Route path='/signin' element={<Login></Login>} />
        <Route path='/signup' element={<SignUp></SignUp>} />
      </Routes>
    </Router>
    
  );
}

export default App;
