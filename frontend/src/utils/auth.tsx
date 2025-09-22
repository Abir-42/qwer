'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Router from 'next/router';

const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: any) => {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(()=>{
    const t = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if(t) setTokenState(t);
  },[]);

  const setToken = (t:string|null) => {
    if(t) localStorage.setItem('token', t); else localStorage.removeItem('token');
    setTokenState(t);
  };

  const logout = () => { setToken(null); Router.push('/login'); };

  return <AuthContext.Provider value={{ token, setToken, setTokenState, setToken, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export const useAuthToken = () => useContext(AuthContext)?.token;
export const useAuthUser = () => {
  const t = useContext(AuthContext)?.token;
  if(!t) return null;
  try{ return jwt_decode(t); }catch{ return null; }
};
