"use client";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {
  ChevronDown,
  LogOut,
  Plus,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import LogoutModal from '../reusable/LogoutModal';


const ProfileDialogLayout = ({
  userData,
  setOpen,
  open,
}: {
  userData: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth);

      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const isIconOnly = screenWidth <= 1200;

  return (
    <>
      <LogoutModal logoutModal={logoutModal} setLogoutModal={setLogoutModal} />
      <button onClick={() => setOpen(true)}
        className={`w-full border-none bg-white rounded-[16px] ${isIconOnly ? "px-2" : "px-8"} py-3`}
      >
        {isIconOnly ? (
          <div className='flex items-center justify-center'>
            <Image src={userData?.icon} alt='user profile' width={28} height={28} />
            <ChevronDown className="text-black" />
          </div>
        ) : (
          <>
            <p className='text-left text-[#727171] font-semibold mb-2'>Change Company</p>
            <div className='flex items-center gap-x-4'>
              <Image src={userData?.icon} alt='user profile' width={28} height={28} />
              <div className='flex justify-between items-center w-full'>
                <span className='text-primary-normal'>Gfam</span>
                <ChevronDown className="text-black" />
              </div>
            </div>
          </>
        )}
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent className="w-[300px] h-fit left-[320px] top-[90%]">
          <div className="flex flex-col gap-2">
            <p className='text-xl font-medium'>Gfam</p>
            <p className='text-xl font-medium'>Asap</p>
          </div>

          <Link href="/admin-setup/business-account">
          <div className='flex items-center gap-2 cursor-pointer w-fit mt-5'>
            <Plus className='text-primary-normal' />
            <p className='font-medium tracking-wide text-primary-normal text-base'>Add More Company</p>
          </div>
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileDialogLayout;
