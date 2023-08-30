import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';

export const Login = ({ isAuth }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();

        const user = {
            username: username,
            password: password
        }

        const headers = {
            'Content-Type': 'application/json'
          };
          
        const config = {
            headers: headers,
            withCredentials: true
        };
        try {
            const { data } = await axios.post(
              'http://127.0.0.1:8000/accounts/token/',
              user,
              config 
            );
            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            axios.defaults.headers.common['Authorization'] = 
                                         `Bearer ${data['access']}`;
            if (localStorage.getItem('refresh_token') !== 'null') {
                navigate('/')
            }            
          } catch (error) {
            console.error(error);
          }

    }

    return (
        <section className="bg-gray-50">
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <Link to="" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black">
                    <img className="logo mr-6" src="https://upload.wikimedia.org/wikipedia/commons/6/67/Microsoft_To-Do_icon.png" alt="logo" />
                    DayTodo    
                </Link>

            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="rubik-font text-xl text-center font-bold leading-tight tracking-tight md:text-2xl">
                  Sign in to your account
              </h1>
                    <form className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your username</label>
                            <input type="email" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Username" value={username} onChange={e => setUsername(e.target.value)} required="" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} onChange={e => setPassword(e.target.value)} required="" />
                        </div>
                       
                        <button type="submit" onClick={submitHandler} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        
                    </form>
                </div>
            </div>
            </div>
        </section>
    )
}
