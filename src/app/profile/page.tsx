"use client"
import React from 'react'
import { Camera } from 'lucide-react'
import { useFormik } from 'formik';
import CustomInput from '@/components/Frominput/CustomInput';
import Image from 'next/image';
import ActionButton from '@/components/Buttons/ActionButton';

const ProfilePage = () => {
    const formik = useFormik({
        initialValues: {
            userName: ""
        },
        onSubmit() { },
    });
    return (
        <section className="bg-[#FCFCFC] w-full rounded-md flex-grow p-6">
            <div className='mt-5 p-7'>
                <div>
                    <p className='text-2xl '>Profile</p>
                    <p className='text-sm text-[#939292]'>Edit Your Profile</p>
                </div>

                <div className='my-5'>
                    <Image src="/bigPic.png" alt="profile"  width={100} height={40}/>
                </div>

                <div className='flex gap-2 items-center'>
                    <Camera className='text-primary-normal' />
                    <p className='text-primary-normal font-medium text-lg '>Change Profile Picture</p>
                </div>

                <div>
                    <form onSubmit={formik.handleSubmit} className='mt-5 w-full  md:w-[300px]'>
                        <div className='flex flex-col gap-1'>
                            <CustomInput
                                label='User Name'
                                placeholder='Admin'
                                type='text'
                                id="userName"
                                name='userName'
                                onChange={formik.handleChange}
                                value={formik.values.userName}
                            />
                            <ActionButton
                            actionType='submit'
                            text="Save Changes"
                            customPadding='px-5 py-4'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ProfilePage