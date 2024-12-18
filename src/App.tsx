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
import PrivateRoute from './components/pages/expert/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='signin' element={<Login></Login>} />
        <Route path='signup' element={<SignUp></SignUp>} />
        <Route path="/admin" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="subjects" element={<Subject />} />
          <Route path="subjects/:id" element={<SubjectDetail />} />
          <Route path="subjects/:subjectId/skills/:skillId" element={<SubSkill />} />
          <Route path="subjects/:subjectId/skills/:skillId/subskills/:subSkillId" element={<SubSubSkill />} />
          <Route path="statistics" element={<Statistic />} />
        </Route>

      </Routes>
    </Router>

  );
}

export default App;
