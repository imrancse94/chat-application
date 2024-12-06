import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';


{/* <label htmlFor={name} className="block mt-4 text-sm text-black">
                    <span className={`text-gray-700 dark:text-gray-400 ${error?.message ? 'text-red-500':''}`}>{label}</span>
                    <input
                        autoComplete={name == 'password' ? 'new-password':'off'}
                        className={`block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input ${error?.message ? 'border border-red-500':''}`}
                        placeholder={placeholder}
                        type={type}
                        value={type === 'number' && field.value === 0 ? '' : field.value}
                        onChange={(event) => {
                            if (type === 'number') {
                                field.onChange(Number(event.target.value));
                            } else {
                                field.onChange(event.target.value);
                            }
                        }}

                    />
                    {error?.message && <p className='text-red-500'>{error?.message}</p>}
                </label> */}

const InputField = ({ label, name, placeholder, type }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className="mb-2">
                    <label htmlFor={name} className="mb-1 block text-sm font-medium text-black dark:text-white">
                        {label}
                    </label>
                    <input
                        autoComplete={name == 'password' ? 'new-password':'off'}
                        type={type}
                        placeholder={placeholder}
                        className={`${error?.message ? 'border border-red-500':'border-[1.5px] border-stroke focus:border-primary active:border-primary'} w-full rounded-lg bg-transparent px-5 py-3 font-normal text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        value={type === 'number' && field.value === 0 ? '' : field?.value || ""}
                        onChange={(event) => {
                            if (type === 'number') {
                                field.onChange(Number(event.target.value));
                            } else {
                                field.onChange(event.target.value);
                            }
                        }}
                    />
                    {error?.message && <p className='text-red-500'>{error?.message}</p>}
                </div>


            )
            }
        />
    );
}

export default InputField;
