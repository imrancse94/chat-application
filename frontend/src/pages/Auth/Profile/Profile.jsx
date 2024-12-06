import React, { useEffect, useMemo, useState } from 'react';
import InputField from '@/components/Include/InputField';
import FormProvider from '@/contexts/form/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import profileSchema from '@/validation/profile';
import LoadingButton from '@/components/Include/LoadingButton';
import useFetchData from '@/hooks/useFetchData';
import Alert from '../../../components/Include/Alert';



const Profile = () => {

    const {resource,api} = useFetchData('profile');
    const [message,setMessage] = useState("");
    // console.log('profileData',profileData?.data)

    const defaultValues = useMemo(() => {
        return {
            name: '',
            email: '',
            password: '',
            confirm_password:''
        };
    }, [])

    const methods = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues,
    });

    const { handleSubmit, reset, formState: { isSubmitting } } = methods;

    const onSubmit = handleSubmit(async (params) => {
        const response = await api.post('update/profile',params)
        if(response?.data?.status_code == 100){
            setMessage(response?.data?.message)
        }
    })


    useEffect(() => {
        if (resource?.data) {
            reset(resource?.data);
        }
    }, [resource?.data]);

    return (
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Profile
                        </h3>
                    </div>
                    {message && <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <Alert message={message} type="success" close={()=>setMessage("")}/>
                    </div>}
                    <FormProvider methods={methods} onSubmit={onSubmit}>
                        <div className="p-6.5 pt-0">

                            <div className="mb-4.5">
                                <InputField
                                    label="Name"
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                />
                            </div>
                            <div className="mb-4.5">
                                <InputField
                                    label="Email"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                />
                            </div>

                            <div className="mb-4.5">
                                <InputField
                                    label="Password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                />
                            </div>

                            <div className="mb-4.5">
                                <InputField
                                    label="Confirm Password"
                                    type="password"
                                    name="confirm_password"
                                    placeholder="Password"
                                />
                            </div>

                            <LoadingButton
                                label="Save changes"
                                isLoading={isSubmitting}
                                type="submit"
                            />
                        </div>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
}

export default Profile;
