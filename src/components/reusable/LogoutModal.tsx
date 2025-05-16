'use client'
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';


const LogoutModal = ({
  setLogoutModal,
  logoutModal,
}: {
  setLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
  logoutModal: boolean;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.clear();
    queryClient.invalidateQueries({ queryKey: ["user"] });
    router.push("/login");

  };

  return (
    <Dialog
      open={logoutModal}
      onClose={() => setLogoutModal(false)}
      aria-labelledby="logout"
      aria-describedby="logout modal"
    >
      <DialogContent>
        <div className=" flex-col flex items-center justify-center w-full md:w-[500px] rounded-lg">
          <div className="flex justify-center items-center">
            <LogOut size={30}/>
          </div>

          <div className="text-center my-8">
            <p className="text-[#303030] text-lg md:text-2xl">
              Are you sure you want to logout
            </p>
          </div>

          <div className=" mb-5 flex justify-center items-center flex-col gap-5 w-full flex-wrap ">
            <button
              onClick={() => {
                setLogoutModal(false);
              }}
              className="border-[#999999] w-1/2 border rounded-lg py-3  capitalize text-lg font-medium"
            >
              cancel
            </button>

            <button
              onClick={handleLogout}
              className="rounded-lg py-3 w-1/2 capitalize text-white bg-[#D92D20] text-lg font-medium"
            >
              logout
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
