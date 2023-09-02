import React from 'react'
import Header from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import useAuth from '../../../hooks/useAuth'

const PrivateLayout = () => {
    const { auth, loading } = useAuth();

    if (loading) {
        return <div className="loader"></div>
    }
    else {
        return (
            <>
                {/* Layout */}
                <Header />

                {/* Contenido principal */}
                <section className="layout__content">
                    {auth._id ? <Outlet /> : <Navigate to="/login" />}
                </section>

                {/* Barra lateral */}
                <Sidebar />
            </>
        )
    }
}

export default PrivateLayout