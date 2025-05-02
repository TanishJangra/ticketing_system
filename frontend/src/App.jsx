import { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Layout from './Layout/Layout';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Analytics from './pages/Analytics/Analytics';
import TeamMembers from './pages/TeamMembers/TeamMembers';
import Settings from './pages/Settings/Settings';
import ChatBot from './pages/ChatBot/ChatBot';
import ContactCenter from './pages/ContactCenter/ContactCenter';
import axios from 'axios';

function App() {

  const [chatConfig, setChatConfig] = useState(null);

  useEffect(() => {
  const fetchChatBoxUI = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/api/chatCustomization");
      console.log("resp is : ", resp);
      setChatConfig(resp.data);
    } catch (error) {
      console.error("Error in fetching data.", error);
    }
  }
  fetchChatBoxUI();
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard chatConfig={chatConfig} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/app' element={<Layout />} >
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='analytics' element={<Analytics/>} />
          <Route path='team_members' element={<TeamMembers/>} />
          <Route path='settings' element={<Settings/>} />
          <Route path='chatbot' element={<ChatBot chatConfig={chatConfig}/>} />
          <Route path='contact_center' element={<ContactCenter/>} />

        </Route>

      </Routes>
    </Router>
  )
}

export default App
