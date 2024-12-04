import React from 'react';
import { SignUp } from './components/pages/SignUp';
import { Login } from './components/pages/LogIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard } from './components/pages/expert/Dashborad';
import { Layout } from './components/pages/Layout';
import { Subject } from './components/pages/expert/Subject';
import { Statistic } from './components/pages/expert/Statistic';


function App() {
  return (
    <Router> 
      <Routes>
        <Route path='/' element={<Layout></Layout>} >
          <Route index element={<Dashboard />} />
          <Route path='subjects' element = {<Subject></Subject>} />
          <Route path='statistics' element = {<Statistic></Statistic>}/>
        </Route>
      </Routes>
    </Router>
    
  );
}

export default App;
