import CustomInput from '@/components/Frominput/CustomInput';
import { useFormik } from 'formik';
import React from 'react';

const SecuritySettings = () => {
  const formik = useFormik({
    initialValues: {
      session: "",
    },
    onSubmit() { },
  });
  return (
    <main>
      <h2 className="text-2xl font-semibold mb-6">Security Settings</h2>

      <div className="mb-6">
        <h2 className="text-xl font-medium mb-4">Two-factor Authentication</h2>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="twoFactor"
              value="enable"
              className="form-radio w-6 h-6 accent-primary-normal"
            />
            <span className="text-gray-800">Enable Two-factor Authentication</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="twoFactor"
              value="disable"
              className="form-radio w-6 h-6 accent-primary-normal"
            />
            <span className="text-gray-800">Don’t enable two-factor authentication</span>
          </label>
        </div>
      </div>

      <div className='w-[20rem]'>
      <h2 className="text-2xl font-semibold mb-2">Login Session Expiration</h2>
        <CustomInput
          placeholder='Select a duration for you login validity'
          type='select'
          id="session"
          name='session'
          onChange={formik.handleChange}
          value={formik.values.session}
        />
      </div>
    </main>
  );
}

export default SecuritySettings;
