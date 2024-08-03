import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import crypto from 'crypto'
import sha256 from 'crypto-js/sha256'

const BACKEND_URL = import.meta.env.VITE_APP_BASE_URL;


export function Login({ FormHandle }) {

    // cosnt [passwordList, setPasswordList] = useState([]);
    const [addData, setAddData] = useState({
        username: '',
        password: '',
    })

    useEffect(() => {
        
    },[])


    const handlePasswordData = (key, e) => {
        e.preventDefault();
        const value = e.target.value;
        const newData = {...addData, [key]: value}
        setAddData(newData);
        // console.log(addData);
    }

    const handleAddPassword = async (e) => {
        e.preventDefault();

        const userData = {
            username: addData.username,
            password: addData.password,
        }
       
        //if data is null return (unable to submit)
        if(!addData.username|| !addData.password){
            console.log('Input required!')
            return;
        }
        console.log(userData)

        await Axios.post(BACKEND_URL , userData)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }


  return (
    <>
        <div className='leftside'>
        <div className="flex mt-10 min-h-full flex-1 justify-center px-6 py-12 lg:px-8">
            <div className='w-96 container-add flex-row justify-self-center  h-auto rounded-lg dark:bg-gray-100 p-10 shadow-2xl'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <h2  className="text-[#2d7fa3] text-center text-2xl font-bold leading-9 tracking-tight ">
                    User Login 
                    </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                            id="text"
                            name="text"
                            type="text"
                            required
                            autoComplete="text"
                            placeholder='Username'
                            value={addData.username}
                            onChange={e => handlePasswordData("username", e)}
                            className="p-3  text-xs block w-full rounded-md 
                            border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                            ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                            focus:ring-inset  sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div>
                        <div className="flex items-center justify-between ">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                            </label>
                            <div className="text-sm">
                            
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            placeholder='Password'
                            value={addData.password}
                            onChange={e => handlePasswordData("password", e)}
                            className=" p-3 text-xs block w-full rounded-md border-0 py-1.5
                            text-gray-900 shadow-sm ring-1 ring-inset
                            ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                            focus:ring-inset  sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <a href="#" className="text-xs text-black-600 hover:text-cyan-800">
                                Forgot password?
                            </a>

                        <div>
                        <button
                            type="submit" 
                            onClick={handleAddPassword}
                            className="p-3 mt-20 select-none rounded-lg bg-gray-400 py-3 px-6 
                            text-center align-middle font-sans text-xs 
                            font-bold uppercase text-white shadow-md shadow-gray-600/50
                            transition-all hover:shadow-lg hover:shadow-blue-500/40 
                            focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none 
                            disabled:pointer-events-none disabled:opacity-50 
                            disabled:shadow-none flex w-full justify-center  leading-6 hover:bg-cyan-700
                            focus-visible:outline focus-visible:outline-2 
                            focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Sign in
                        </button>
                        </div>
                    </form>

                    <p style={{cursor:'pointer'}} onClick={()=> FormHandle('signup')} className="mt-3 text-center text-sm text-gray-500">
                        Register New User{''}
                    </p>
                    </div>
                </div>
            </div>
        </div>
     
     

    </>

  )
}
