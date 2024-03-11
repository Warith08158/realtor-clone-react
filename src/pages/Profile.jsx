import React, { useState } from 'react'
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import { FcHome } from "react-icons/fc";
import { db } from '../firebase';
import { Link } from 'react-router-dom';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
  const {name, email} = formData;

  function onLogout(){
    auth.signOut();
    navigate('/');
  }

  function onChange(e){
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value
    }))
  }
  async function onSubmit(){
    if(name !== ''){
      if(auth.currentUser.displayName !== name){
        try {
          await updateProfile(auth.currentUser, {
            displayName: name,
          });
          const docRef = doc(db, 'users', auth.currentUser.uid);
          updateDoc(docRef, {
            name: name
          })
          toast.success('Updated successfully')
        } catch (error) {
          console.log(error);
        }
      } else{
        toast.error("Name already exists")
      }
    }else{
      toast.error("Invalid name")
    }
  }

  return (
    <>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            {/* name input */}
            <input type="text" id='name' value={name} disabled={!changeDetail} className={`text-left mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetail && "bg-red-200 focus:bg-red-200"}`} onChange={onChange}/>

            {/* email input */}
            <input type="text" id='email' value={email} disabled={true} className=" text-left mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"/>

            <div className='flex items-center justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
              <div className='flex items-center'>Do you want to change your name?
                <span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer' onClick={() => {
                  setChangeDetail((prev) => !prev)
                  // changeDetail && onSubmit()
                  // setChangeDetail((prev) => !prev)
                }}>{ changeDetail ? <p onClick={() => onSubmit()}>apply change</p> : <p>edit</p> }</span>
              </div>
              <p className='text-blue-600 hover:text-blue-700 transition ease-in-out duration-200 cursor-pointer' onClick={onLogout}>Sign out</p>
            </div>
          </form>
          <button type="submit" className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>
            <Link to="/create-listing" className='flex justify-center items-center'>
              <FcHome className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2' />
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>
    </>
  )
}
