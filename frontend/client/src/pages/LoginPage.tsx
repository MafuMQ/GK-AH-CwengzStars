import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import {FaApple} from 'react-icons/fa';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-pink-200 to-blue-200 p-6">
        <div className='max-w-xl mx-auto bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl shadow-lg p-8'>
            <h2 className="font-fredoka text-4xl mb-6 text-white font-bold text-center">Login</h2>

            <p className="text-center p-4 text-gray-700 mb-4">
                    Welcome back! Please enter your credentials to access your account. If you don't have an account yet, you can 
                    <a href="/signup" className="text-white hover:underline"> sign up here</a>.
                </p>

            <form onSubmit={handleSubmit} className='py-5'>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="form-control mt-1 block w-full px-3 py-2 text-white rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="form-control mt-1 block w-full px-3 py-2 text-white shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm" />
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            <div className="justify-center items-center w-full px-4 md:px-0">

                <button type="submit" className="w-[100%] bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 flex items-center justify-center"><span className="ml-2">Log In</span>
                </button>
                      
                <br/><hr/><br/>

                <button type="submit" className="w-[100%] bg-white text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition duration-200 flex items-center justify-center border"> <FcGoogle className="w-6 h-6" /><span className="ml-2">Sign in with Google</span>
                </button>                    
                      
                <br/>

                <button type="submit" className="w-[100%] bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200 flex items-center justify-center"><FaApple className="w-6 h-6" /><span className="ml-2">Sign in with Apple</span>
                </button>
            </div>
                    
            <p className="text-gray-700 mt-2 text-sm text-center py-5">
                If you have forgotten your password, you can reset it by clicking
                <a href="/reset-password" className="text-white hover:underline"> here</a>.
            </p>

        </div>
        
    </section>
  );
};

export default LoginPage;