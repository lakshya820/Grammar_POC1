import Login from './components/Login';
import MainLayout from './components/MainLayout';
import Dashboard2 from './components/Dashboard2';
import VoiceTest from './components/VoiceTest';
import TypeTest from './components/TypeTest';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Grammar from './components/Grammar';
import Tests1 from './components/Tests1';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/tests2" element={<VoiceTest />} />
      <Route path="/grammar" element={<Grammar />} />
      <Route path="tests1" element={<Tests1 />} />
      <Route path="/main" element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard2 />} />
      </Route>
    </Routes>
  </Router>
  );
}

export default App;

