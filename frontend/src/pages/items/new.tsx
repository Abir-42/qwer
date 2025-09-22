import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Router from 'next/router';
import API from '../../utils/api';
import { useAuth } from '../../utils/auth';

const schema = z.object({ title: z.string().min(1), description: z.string().optional(), quantity: z.number().min(0) });

export default function NewItem(){
  const { token } = useAuth();
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) as any });
  const onSubmit = async (vals:any) => {
    await API.post('/items', vals, { headers:{ Authorization:`Bearer ${token}` }});
    Router.push('/dashboard');
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-6 border rounded">
        <h2 className="text-lg mb-3">New Item</h2>
        <input {...register('title')} placeholder="Title" className="w-full mb-2 p-2 border rounded" />
        <input {...register('description')} placeholder="Description" className="w-full mb-2 p-2 border rounded" />
        <input type="number" {...register('quantity')} placeholder="Quantity" className="w-full mb-2 p-2 border rounded" />
        <button className="w-full py-2 bg-blue-600 text-white rounded">Create</button>
      </form>
    </div>
  );
}
