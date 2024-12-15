import React from 'react';
import { SignUp } from './components/pages/SignUp';
import { Login } from './components/pages/LogIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard } from './components/pages/expert/Dashborad';
import { Layout } from './components/pages/Layout';
import { Subject } from './components/pages/expert/Subject';
import { Statistic } from './components/pages/expert/Statistic';
import { SubjectDetail } from './components/pages/expert/SubjectDetail';
import { SubSkill } from './components/pages/expert/SubSkill';
import { SubSubSkill } from './components/pages/expert/SubSubSkill';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='signin' element={<Login></Login>} />
          <Route path='signup' element={<SignUp></SignUp>} />
      </Routes>
    </Router>

  );
}

export default App;
