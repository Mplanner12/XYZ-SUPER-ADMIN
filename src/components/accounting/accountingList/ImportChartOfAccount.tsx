import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import ActionButton from '@/components/Buttons/ActionButton';
import CustomInput from '@/components/Frominput/CustomInput';
import { useModal } from '@/util/Modals/ModalsContext';
import { useFormik } from 'formik';
import { X } from 'lucide-react';
import Image from 'next/image';

const ImportChartOfAccount: React.FC = () => {
  const { closeModal } = useModal();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fieldOptions, setFieldOptions] = useState<{ value: string; label: string }[]>([]);

  const formik = useFormik({
    initialValues: {
      opening_balance: '',
      account_code: '',
      parent_account: '',
      account_type: '',
      location: '',
      description: '',
      currency: '',
    },
    onSubmit(values) {
      console.log('Form Values:', values);
      if (uploadedFile) {
        console.log('Final Mapped Fields:', values);
        // Proceed with further processing (e.g., sending to server)
      } else {
        alert('Please upload a file');
      }
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUploadedFile(file);
      readFile(file);
    }
  };

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      console.log('Scanned Data:', jsonData);
      generateFieldOptions(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  const generateFieldOptions = (data: any[]) => {
    const headers = data[0]; // Use the first row as headers
    const options = headers.map((header: string) => ({
      value: header,
      label: header.replace(/_/g, ' '), // Replace underscores with spaces
    }));

    setFieldOptions(options); // Set the options in state
    console.log('Generated Field Options:', options);
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#434343] bg-opacity-50 flex justify-center items-center overflow-y-auto py-2">
      <div className="relative mt-[30rem] mb-10">
        <button
          onClick={closeModal}
          className="absolute bg-white h-10 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full"
        >
          <X className="text-primary-normal" />
        </button>
        <div className="bg-white p-6 rounded-2xl shadow-md w-[40rem] relative no-scrollbar">
          <div className="flex flex-col justify-center items-center mb-6">
            <p className="text-[18px] font-medium mb-3">Import Chart of Account</p>
            <p className="mb-3">Upload Chart of Account Document</p>

            {/* File Upload Section */}
            <label className="flex w-[40%] gap-3 border rounded-md mb-3 border-[#ececec] py-3 justify-center cursor-pointer">
              {uploadedFile ? uploadedFile.name : 'Upload File'}
              <input type="file" accept=".xlsx, .csv" onChange={handleFileUpload} className="hidden" />
              <Image className="mr-1" src="/arrowhead.png" width={15} height={15} alt="icon" />
            </label>

            {uploadedFile && (
              <span className="flex w-[40%] gap-3 rounded-md bg-[#FAFAFA] py-3 justify-center">
                {uploadedFile.name}
                <X className="text-primary-normal cursor-pointer" onClick={() => setUploadedFile(null)} />
              </span>
            )}
          </div>

          {/* Form Inputs */}
          {[
            'opening_balance',
            'account_code',
            'parent_account',
            'account_type',
            'location',
            'description',
            'currency',
          ].map((field) => (
            <div key={field} className="flex items-center justify-between mb-1 text-center">
              <p className="mb-1 capitalize">{field.replace('_', ' ')}</p>
              <div className="w-[40%]">
                <CustomInput
                  placeholder={field.replace('_', ' ')}
                  type="select"
                  id={field}
                  name={field}
                  onChange={formik.handleChange}
                  value={formik.values[field as keyof typeof formik.values]}
                  options={fieldOptions} // Dynamically set options
                />
              </div>
            </div>
          ))}

          <div className="my-5 flex justify-center">
            <ActionButton
              text="Import Chart of Account"
              customPadding="py-4 px-3 w-[50%]"
              onClick={formik.handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportChartOfAccount;
