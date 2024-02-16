import React, { useState } from 'react'
import{AiFillEyeInvisible, AiFillEye} from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth';
import { createUserWithEmailAndPassword, getAuth, updateProfile} from "firebase/auth";
import { db } from '../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const {name, email, password} = formData;

  function onChange(e){
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value
    }))
  }

  async function onSubmit(e){
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(auth.currentUser);
      updateProfile(auth.currentUser, {
        displayName: name
      });

      const user = userCredential.user;
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timeStamp = serverTimestamp();
      
      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      navigate('/');
    } catch (error) {
      toast.error("something went wrong with the registration");
    }
  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        {/* image div starts here*/}
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2V5fGVufDB8fDB8fHww" alt="key" className='w-full rounded-2xl ' />
        </div>
        {/* image div ends here */}

        {/* auth form div starts here */}
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <input placeholder='Full name' className='w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' type="text" id='name' value={name} onChange={onChange} />
            <input placeholder='Email address' className='w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' type="email" id='email' value={email} onChange={onChange} />
            {/* password input div starts here */}
            <div className='relative mb-6'>
              <input placeholder='Password' className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' type={showPassword ? "text" : "password"} id='password' value={password} onChange={onChange} />
              <div className='absolute top-4 right-3 cursor-pointer' onClick={() => setShowPassword((prev) => !showPassword)}>
                {
                  showPassword ? (<AiFillEyeInvisible/>) : (<AiFillEye/>)
                }
              </div>
            </div>
            {/* password input div ends here */}
            
            {/* create new account page div starts here */}
            <div className='mb-6 flex items-center justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p>
                Have an account?
                <Link to="/sign-in" className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'>Sign in</Link></p>
              <p>
                <Link to="/forgot-password" className='text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out'>Forgot Password?</Link>
              </p>
            </div>
            {/* create new account page div ends here */}

            <button className='w-full text-center bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 eas-in-out hover:shadow-lg active:bg-blue-800' type="submit">Sign Up</button>
            <div className='my-4 flex items-center before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <Oauth/>
          </form>
        </div>
        {/* auth form div ends here */}
      </div>
    </section>
  )
}