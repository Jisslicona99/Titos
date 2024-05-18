import React, { useState, useEffect, useRef } from 'react';
import { HiMenu } from 'react-icons/hi';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import AuthService from '@/services/AuthService';
import Avatar from '@/assets/images/avatar.jpg';
import useLayoutStore from '@/stores/store';
 
const Header = () => {
    const { isOpen, toggleSidebar } = useLayoutStore();
    const authService = new AuthService();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [usuario, setUsuario] = React.useState([]);

    const handleLogout = () => {
        Cookies.remove('access_token'); 
        navigate('/login');
    };

    const handleProfile = () => {
        // Aquí puedes agregar la lógica para navegar al perfil del usuario
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };
    React.useEffect(() => {
        const fetchUsuarios = async () => {
            const data = await authService.me(); 
            setUsuario(data);
        }; 
        fetchUsuarios();
    }, []);
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);

    return (
        <div className="fixed top-0 bg-gray-800 text-white h-16 flex items-center justify-between px-4 shadow-lg" style={{ width: isOpen ? 'calc(100% - 250px)' : 'calc(100% - 70px)', zIndex: 999999 }}>
            <button className="text-2xl" onClick={toggleSidebar}>
                <HiMenu />
            </button>
            <div className="relative flex items-center">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center">
                    <div className='h-8 w-8 rounded-full  border border-gray-400  shadow-lg'> 
                        <img
                            className="h-8 w-8 rounded-full"
                            src={usuario.avatar ? usuario.avatar : Avatar}
                            alt="User avatar"
                        />
                    </div>
                </button>
                {dropdownOpen && (
                    <div ref={dropdownRef} className="absolute top-8 right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-black z-10" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button onClick={handleProfile} className="block px-4 py-2 text-sm w-full text-left shadow-sm text-gray-900 font-bold  "> {usuario.name}!!</button>
                        <button onClick={handleProfile} className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-200">Perfil</button>
                        <button onClick={handleLogout} className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-200">Cerrar Sesión</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;