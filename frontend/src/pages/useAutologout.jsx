import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IsTokenExpire from '../components/IsTokenExpire';
import { toast } from 'react-toastify';


export default function useAutologout() {
    const nevigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem('token');
            if (!token || !IsTokenExpire(token)) {
                localStorage.removeItem('token');
                toast.error("Votre session a expiré, veuillez vous reconnecter.");
                nevigate('/login')// redirection immédiate si expiré
            }
        }, 3000)//verifie tt les 3sc
        return () => clearInterval(interval);
    }, [nevigate])

}
