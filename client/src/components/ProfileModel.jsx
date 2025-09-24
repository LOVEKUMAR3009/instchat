import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets'
import { Pencil } from 'lucide-react';

const ProfileModel = ({setShowEdit}) => {
    const user = dummyUserData;
    const[editForm,setEditForm] = useState({
        username:user.username,
        bio:user.bio,
        location:user.location,
        profile_picture:null,
        full_name :user.full_name,
        cover_photo :null,

    })

    const handleSaveProfile = async(e)=>{
        e.preventDefault();
    }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-110 h-screen overflow-y-scroll bg-black/50'>
        <div className='max-w-2xl sm:py-6 mx-auto'>
            <div className='bg-white rounded-lg shadow p-6'>
                <h1 className='text-2xl font-bold text-gray-900 mb-6'>Edit Profile</h1>
                <form className='space-4 ' onSubmit={handleSaveProfile}>
                    <div className='flex flex-col items-start gap-3'>
                        <label htmlFor="proifle_picture" className='block text-sm font-medium text-gray-700 mb-1'>
                            Profile Picture
                            <input hidden type="file" name="" id="proifle_picture" accept='image/*' className='w-full p-3 border-gray-2-- rounded-lg' onChange={(e)=>setEditForm({...editForm,profile_picture:e.target.files[0]})}/>
                            <div className='group/profile relative'>
                                <img src={editForm.profile_picture ?URL.createObjectURL(editForm.profile_picture):user.profile_picture} alt="" className='size-24 rounded-full object-cover mt-2' />

                                <div className='absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-full items-center justify-center'>
                                    <Pencil  className='size-5 text-white'/>
                                </div>
                            </div>
                        </label>
                    </div>


                    {/*  cover_photo  */}

                    <div className='flex flex-col items-start gap-3'>
                        <label htmlFor="cover_photo" className='block text-sm font-medium text-gray-700 mb-1'>
                            Cover Photo
                            <input hidden type="file" name="" id="cover_photo" accept='image/*' className='w-full p-3 border-gray-2-- rounded-lg' onChange={(e)=>setEditForm({...editForm,cover_photo:e.target.files[0]})}/>

                            <div className='group/cover relative'>
                                <img src={editForm.cover_photo ?URL.createObjectURL(editForm.cover_photo):user.cover_photo} alt="" className='w-80 h-40 rounded-lg bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200  object-cover mt-2' />

                                <div className='absolute hidden group-hover/cover:flex top-0 left-0 right-0 bottom-0 bg-black/20  items-center justify-center'>
                                    <Pencil  className='size-5 text-white'/>
                                </div>
                            </div>
                        </label>
                    </div>


                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Name
                        </label>
                            <input type="text" placeholder='Please enter your full name' onChange={()=>setEditForm({...editForm,full_name:e.target.value})} value={editForm.full_name} className='w-full p-3 border border-gray-200 rounded-lg'  />
                    </div>



                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Username
                        </label>
                            <input type="text" placeholder='Please enter a username' onChange={()=>setEditForm({...editForm,username:e.target.value})} value={editForm.username} className='w-full p-3 border border-gray-200 rounded-lg'  />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Bio
                        </label>
                            <textarea placeholder='write something... ' rows={3} onChange={()=>setEditForm({...editForm,bio:e.target.value})} value={editForm.bio} className='w-full p-3 border border-gray-200 rounded-lg'  />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Location
                        </label>
                            <input type='text' placeholder='Enter your location'  onChange={()=>setEditForm({...editForm,location:e.target.value})} value={editForm.location} className='w-full p-3 border border-gray-200 rounded-lg'  />
                    </div>

                    <div className='flex justify-end space-x-3 pt-6'>
                        <button type='button' onClick={()=>setShowEdit(false)} className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer'>Cancel</button>
                        <button type='submit' className='px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:form-indigo-600 hover:to-purple-700 cursor-pointer  rounded-lg  hover:bg-gray-50 transition-colors active:scale-95'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ProfileModel
