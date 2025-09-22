import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import API from '../../utils/api';
import { useAuth } from '../../utils/auth';
import Router from 'next/router';

export default function EditItem(){
  const { token } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit, setValue } = useForm();
  useEffect(()=>{ if(!id) return; (async()=>{ const res = await API.get(`/items`, { headers:{ Authorization:`Bearer ${token}` }}); const item = res.data.find((x:any)=> x._id===id); if(item){ setValue('title', item.title); setValue('description', item.description); setValue('quantity', item.quantity); } })(); },[id]);
  const onSubmit = async (vals:any) => { await API.put(`/items/${id}`, vals, { headers:{ Authorization:`Bearer ${token}` }}); Router.push('/dashboard'); };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-6 border rounded">
        <h2 className="text-lg mb-3">Edit Item</h2>
        <input {...register('title')} placeholder="Title" className="w-full mb-2 p-2 border rounded" />
        <input {...register('description')} placeholder="Description" className="w-full mb-2 p-2 border rounded" />
        <input type="number" {...register('quantity')} placeholder="Quantity" className="w-full mb-2 p-2 border rounded" />
        <button className="w-full py-2 bg-blue-600 text-white rounded">Update</button>
      </form>
    </div>
  );
}
