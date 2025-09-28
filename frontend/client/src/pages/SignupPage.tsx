import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword } from '../lib/firebase';
import { FcGoogle } from 'react-icons/fc';
// import {FaApple} from 'react-icons/fa';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google sign-up failed.');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-pink-200 to-blue-200 p-6">
        <div className='max-w-xl mx-auto bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl shadow-lg p-8'>
            <h2 className="font-fredoka text-4xl mb-4 text-white text-center font-bold py-1">Sign Up</h2>

             <p className="text-center p-2 text-gray-700 mb-4">
                    Welcome Please enter your credentials to create your account. If you do have an account, you can 
                    <a href="/login" className="text-blue-800 hover:underline"> log in here</a>.
              </p>

      <form onSubmit={handleSubmit} className='py-1'>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="form-control mt-1 block w-full px-3 py-2  text-gray-700 shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"/>

        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="form-control mt-1 block w-full px-3 py-2 text-white shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"/>

        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required className="form-control mt-1 block w-full px-3 py-2 text-white shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"/>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="w-[100%] bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 mt-4">
          <span className="ml-2">Sign Up</span>
        </button>
      </form>
      <div className="justify-center items-center w-full px-4 md:px-0">
          <br/><br/>
          <hr/><br/>
          <button type="button" onClick={handleGoogleSignup} className="w-[100%] bg-white text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition duration-200 flex items-center justify-center border"> <FcGoogle className="w-6 h-6" /><span className="ml-2">Sign Up with Google</span>
          </button>                    
      </div>
            <p className="text-gray-700 mt-2 text-sm text-center py-5">Already have an account? <a href="/login" className="text-blue-800 hover:underline">Login</a></p>
                
        </div>
    </section>
  );
}

export default SignupPage;