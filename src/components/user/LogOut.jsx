import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

const LogOut = () => {
    const navigate = useNavigate();
    const {setAuth, setCounters} = useAuth();

    useEffect(() => {
        //Vaciar local storage
        localStorage.clear();

        // setear estados globales a vacio
        setAuth({});
        setCounters({});

        // navegar a login
        navigate("/login")
    }, [])
    

    return (
        <div className="loader"></div>
    )
}

export default LogOut