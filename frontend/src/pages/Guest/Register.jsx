import React, { useMemo, useState } from 'react';
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';
import InputField from '@/components/Include/InputField';
import FormProvider from '@/contexts/form/FormProvider';
import registerSchema from '@/validation/register';
import { yupResolver } from '@hookform/resolvers/yup';
import useAxios from '@/hooks/useAxios';
import Alert from '@/components/Include/Alert';
import Loader from '@/components/Include/Loader';
import LoadingButton from '../../components/Include/LoadingButton';

const Register = () => {

  const { api } = useAxios();
  const [message, setMessage] = useState({});

  const defaultValues = useMemo(() => ({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  }), [])

  const methods = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = handleSubmit(async (params) => {

    const {name,email,password} = params;
    try{
      
      const { data } = await api.post('/auth/signup', {name,email,password});
      
      if (data?.message) {
        reset();
        setMessage({success:true,message:data.message});
      }
    }catch(err){
      setMessage({success:false,message:'Something is wrong. Please try again'});
    }

  })


  return (
    <div className="w-full">
      <h1
        className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
      >
        Create account
      </h1>
      {isSubmitting && <Loader />}
      {message.message &&
        <>
          <Alert
            close={() => setMessage({})}
            type={message.success ? 'success':'error'}
            message={message.message}
          >
            {message.success && (<><Link className='underline' to={'/login'}>Click here</Link> to login</>)}
          </Alert>
        </>
      }
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <InputField
          label="Name"
          name="name"
          type="text"
          placeholder="e.g, jhon"
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="e.g, jhon@example.com"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="********"
        />
        <InputField
          label="Confirm Password"
          name="confirm_password"
          type="password"
          placeholder="********"
        />

        <LoadingButton
          isLoading={isSubmitting}
          label="Create account"
          type='submit'
          className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        />

      </FormProvider>
      <hr className="my-8" />

      <p className="mt-4">
        <Link
          className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
          to="/login"
        >
          Already have an account? Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
