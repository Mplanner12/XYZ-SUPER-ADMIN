import CustomInput from '@/components/Frominput/CustomInput';
import { useFormik } from 'formik';
import React from 'react'

const LanguageTab:React.FC = () => {
    const formik = useFormik({
        initialValues: {
            language: "",
            country: "",
            currency: ""
        },
        onSubmit() { },
    });
    return (
        <main>
            <h2 className="text-2xl font-semibold mb-6">Language & Localization settings</h2>
            <div className='w-full md:w-[25rem]'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='flex gap-5 flex-col'>
                        <CustomInput
                            placeholder='English'
                            label='Select a preferrred Language'
                            type='select'
                            id="language"
                            name='language'
                            onChange={formik.handleChange}
                            value={formik.values.language}
                        />

                        <CustomInput
                            placeholder='United State Of america'
                            label='Country'
                            type='select'
                            id="country"
                            name='country'
                            onChange={formik.handleChange}
                            value={formik.values.country}
                        />

                        <CustomInput
                            placeholder='Select default Currency'
                            label='Currency'
                            type='select'
                            id="currency"
                            name='currency'
                            onChange={formik.handleChange}
                            value={formik.values.currency}
                        />
                    </div>
                </form>
            </div>
        </main>
    )
}

export default LanguageTab