import Login from './components/Login.';
import MainLayout from './components/MainLayout';
import Dashboard2 from './components/Dashboard2';
import Tests from './components/Tests';
import VoiceTest from './components/VoiceTest';
import TypeTest from './components/TypeTest';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/tests2" element={<VoiceTest />} />
      <Route path="/main" element={<MainLayout />}>
        <Route path="tests1" element={<Tests />} />
        <Route path="dashboard" element={<Dashboard2 />} />
      </Route>
    </Routes>
  </Router>
  );
}

export default App;

