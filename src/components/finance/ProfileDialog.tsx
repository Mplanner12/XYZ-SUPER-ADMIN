"use client";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  ChevronDown,
  LogOut,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { setSourceMapsEnabled } from 'process';
import LogoutModal from '../reusable/LogoutModal';
import { useState } from 'react';
import { useResetProjection } from 'framer-motion';
import Image from 'next/image';


const ProfileDialog = ({
  userData,
  setOpen,
  open,
}: {
  userData:any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const router = useRouter();

  const extractNumber = (string: string) => {
    return string?.match(/\d+/);
  };
  return (
    <>
      <LogoutModal logoutModal={logoutModal} setLogoutModal={setLogoutModal} />
      <button onClick={()=> setOpen(true)}
        className='border-none bg-white rounded-[16px] px-8 py-3'  
      >
        <p className='text-left text-[#727171] font-semibold mb-2'>Change Company</p>
        <div className='flex items-center gap-x-4'>
          <Image src={userData?.icon} alt='user profile' width={28} height={28} />
          <div className='flex justify-between items-center w-full '>
            <span className='text-primary-normal'>Gfam</span>
            <ChevronDown className="text-black" />
          </div>
        </div>
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        
        <DialogContent className="w-[200px] h-fit left-[320px] top-[90%]">
            <div className="flex flex-col gap-y-4">
              <button onClick={()=>setSourceMapsEnabled(false)} className="w-fit">
                <Link
                  href={"/admin/profile"}
                  className="flex gap-1 items-center group transition"
                >
                  <UserRound size={20} className="group-hover:text-black" />
                  <span className="group-hover:text-black">My Profile</span>
                </Link>
              </button>
              <button
                className="w-fit flex gap-1 group"
                onClick={() => setLogoutModal(true)}
              >
                <LogOut size={20} className="group-hover:text-red-500" />
                <span className="group-hover:text-red-500">Log out</span>
              </button>
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const userData = {
  role: "admin",
  firstName: "Omobayode",
  lastName: "Festus",
};
export default ProfileDialog;
