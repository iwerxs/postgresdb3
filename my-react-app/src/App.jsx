import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Register from './components/Login/Register';
import Login from './components/Login/Login';
import CreateUser from './components/User/CreateUser';
import CreateCompany from './components/Company/CreateCompany';
import Referrals from './components/Referrals/Referrals';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './components/styles.css';

const App = () => {
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState('');

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:8080/companies', {
                withCredentials: true
            });
            setCompanies(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized access, please log in.');
                setError('Unauthorized access, please log in.');
            } else {
                console.error('Error fetching companies:', error);
                setError('Failed to fetch companies');
            }
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    return (
        <>
            < div className="App">
            <Navbar />
            <Router>
                <main>
                  <Routes>
                      {/* <Route path="/" element={<div><h1>Welcome to the Home Page</h1></div>} /> */}
                      <Route path="/" element={<Home />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/referrals" element={<Referrals />} />
                      <Route path="/create-user" element={<CreateUser companies={companies} refreshData={fetchCompanies} />} />
                      <Route path="/create-company" element={<CreateCompany />} />
                  </Routes>
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                </main>
            </Router>
            <Footer />
            </div>
        </>
    );
};

export default App;
