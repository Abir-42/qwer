import { useEffect, useState } from 'react';
import { useAuth } from '../utils/auth';
import API from '../utils/api';
import Link from 'next/link';
import Router from 'next/router';

export default function Dashboard(){
  const { token, logout } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  useEffect(()=>{ if(!token) { Router.push('/login'); return; } fetchItems(); },[token]);
  const fetchItems = async () => {
    const res = await API.get('/items', { headers: { Authorization: `Bearer ${token}` } });
    setItems(res.data);
  };
  const deleteItem = async (id:string) => { await API.delete(`/items/${id}`, { headers:{ Authorization:`Bearer ${token}` }}); fetchItems(); };
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
            <Link href="/items/new"><a className="px-3 py-1 bg-green-600 text-white rounded">New Item</a></Link>
            <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {items.map(it=> (
            <div key={it._id} className="p-4 border rounded">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{it.title}</h3>
                  <div className="text-sm">Qty: {it.quantity}</div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/items/${it._id}`}><a className="px-2 py-1 border rounded">Edit</a></Link>
                  <button onClick={()=>deleteItem(it._id)} className="px-2 py-1 border rounded">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
