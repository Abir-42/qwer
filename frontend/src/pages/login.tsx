import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Router from 'next/router';
import API from '../utils/api';
import { useAuth } from '../utils/auth';

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

export default function Login(){
  const { setToken } = useAuth();
  const { register, handleSubmit, formState:{errors} } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (vals:any) => {
    const res = await API.post('/auth/login', vals);
    setToken(res.data.token);
    Router.push('/dashboard');
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-6 border rounded">
        <h2 className="text-xl mb-4">Login</h2>
        <input {...register('email')} placeholder="Email" className="w-full mb-2 p-2 border rounded" />
        {errors.email && <div className="text-red-600">{errors.email.message as any}</div>}
        <input type="password" {...register('password')} placeholder="Password" className="w-full mb-2 p-2 border rounded" />
        {errors.password && <div className="text-red-600">{errors.password.message as any}</div>}
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Login</button>
      </form>
    </div>
  );
}
