import Link from 'next/link';
export default function Home(){
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 border rounded">
        <h1 className="text-2xl font-bold mb-4">Storage Manager</h1>
        <div className="flex gap-2">
          <Link href="/signup"><a className="px-4 py-2 bg-blue-600 text-white rounded">Sign up</a></Link>
          <Link href="/login"><a className="px-4 py-2 border rounded">Login</a></Link>
        </div>
      </div>
    </div>
  );
}
