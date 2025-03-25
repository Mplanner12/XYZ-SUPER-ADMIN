"use client"

import ActionButton from '@/components/Buttons/ActionButton';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { downloadIcon } from '../../../../../public';
import SelectElement from '../../setup/_setupComponets/Input/SelectElement';
import InputElement from '../../setup/_setupComponets/Input/InputElement';
import { MdOutlineRestorePage } from "react-icons/md";
import RestoreBackup from './_components/restoreBackup';

const optionSchema = z.union([
  z.string(),
  z.object({
    value: z.string(),
    label: z.string(),
  }),
]);

const dataBackupSchema = z.object({
  dataBackup: optionSchema.optional(),
  backup_url: z.string().optional(),
});

export const backUpTime = [
	{ value: '', label: 'Select Backup period' },
	{ value: 'daily', label: 'Daily' },
	{ value: 'weekly', label: 'Weekly' },
	{ value: 'monthly', label: 'Monthly' },
	{ value: 'yearly', label: 'Yearly' },
];

type Inputs = z.infer<typeof dataBackupSchema>;

export default function DataBackup() {

  const [isLoading, setIsLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState('data-backup');

  const handleTabChange = (tab: string) => {
    setIsLoading(true);
    setSelectedTab(tab);
    setTimeout(() => setIsLoading(false), 500);
  }

  const methods = useForm<Inputs>({
    resolver: zodResolver(dataBackupSchema),
  });

  const {
		register,
		handleSubmit,
		watch,
		reset,
		trigger,
		formState: { errors },
	} = methods;

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

    type FieldName = keyof Inputs;

	return (
    <>
      {selectedTab === "data-backup" && (
        <section className="w-full text-foundation-black-black-400 overflow-hidden flex flex-col items-start justify-start flex-wrap bg-foundation-grey-grey-50 rounded-2xl px-4 py-4">
          <div className="flex flex-col gap-2">
            <h2 className=" font-medium text-[20px]">Backup Settings</h2>
            <p className="font-normal text-base text-foundation-grey-grey-800">
              Manage data & backup settings
            </p>
          </div>
          <div className="w-full">
            <FormProvider {...methods}>
              <form action="" onSubmit={handleSubmit(processForm)}>
                <div className=" md:w-[40%] w-full flex flex-col gap-4 mt-2">
                  <SelectElement
                    id="backup"
                    label="Auto BackUp"
                    options={backUpTime}
                    registerName="language"
                    error={errors.dataBackup?.message}
                  />

                  <InputElement
                    id="backup_url"
                    label="External URL for Backup"
                    type="text"
                    placeholder="www.googledrive.com/7677"
                    registerName="backup_url"
                    error={errors.backup_url?.message}
                  />

                  <p className="flex gap-2 text-sm cursor-pointer items-center text-foundation-purple-purple-400 hover:text-foundation-purple-purple-300">
                    <span>
                      <Image
                        src={downloadIcon}
                        alt="Download icon"
                        className="w-6 h-6 object-contain"
                      />
                    </span>
                    Download your data
                  </p>
                  <p className="flex gap-2 text-sm cursor-pointer items-center text-foundation-purple-purple-400 hover:text-foundation-purple-purple-300" onClick={() => handleTabChange("restore-backup")}>
                    <span>
                      <MdOutlineRestorePage className="w-6 h-6 object-contain text-foundation-purple-purple-400"/>
                    </span>
                    Restore Backup
                  </p>
                  <ActionButton
                    customPadding="py-3 px-5 text-sm rounded-xl"
                    text="Save Changes"
                  />
                </div>
              </form>
            </FormProvider>
          </div>
        </section>
      )}
      <div>
        {selectedTab === "restore-backup" && (
          <RestoreBackup handleTabChange={handleTabChange}/>
        )}
      </div>
    </>
  );
}
