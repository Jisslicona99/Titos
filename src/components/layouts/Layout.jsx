import React, { useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Toaster } from 'sonner';
import useLayoutStore from '@/stores/store';
const Layout = ({ children }) => {
    const { isOpen, handleResize } = useLayoutStore();

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return (
        <>
            <Sidebar />
            <div style={{ marginLeft: isOpen ? '250px' : '70px' }}>
                <Header />
                <main className="ml-1 bg-slate-50 mt-16" style={{ height: '90vh' }}>
                    {children}
                    <Toaster richColors />
                </main>
                <Footer />
            </div>
        </>
    );
}

export default Layout; 
