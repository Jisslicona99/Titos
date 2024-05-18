import { z } from 'zod';
import { Card, Col, Row } from 'antd';
import React, { useState } from 'react';
import { Toaster, toast } from 'sonner'; 
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Logo from '../assets/images/logo.png';
import AuthService from '../services/AuthService';
import { HiEye, HiEyeOff } from 'react-icons/hi';
const http = new AuthService();

const loginSchema = z.object({
    email: z.string().email('Ingrese un correo electrónico válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            loginSchema.parse({ email, password });
            const response = await http.login({ email, password });
            if (response.access_token) {
                const expires = new Date(new Date().getTime() + response.expires_in * 60000);
                Cookies.set('access_token', response.access_token, { expires });
                navigate('/dashboard');
            } else {
                setErrors({ email: response.error, password: ' ' });
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = {};
                error.errors.forEach((err) => {
                    fieldErrors[err.path[0]] = err.message;
                });
                setErrors(fieldErrors);
            } else {
                toast.error(error.message === "Failed to fetch" ? 'El servidor no se encuentra o está apagado' : 'Error del servidor' + error);
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='container w-full mx-auto  h-screen flex justify-center items-center'>
            <Card
                bordered={false}
                style={{ maxWidth: '800px', width: '80%' }}
                className='md:p-5 md:py-10'
            >
                <Row >
                    <Col xs={24} sm={12} md={8} >
                        <div className='mb-6 text-center'>
                            <h1 className="text-2xl font-bold mb-2">Login</h1>
                            <span className='text-gray-500 text-sm'>Inicia sesión para continuar</span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block">Correo electrónico:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-1 focus:outline-none focus:border-blue-600"

                                />
                                {errors.email && <small className="text-red-500 text-sm w-full">{errors.email}</small>}
                            </div>
                            <div className="mb-4 relative">
                                <label htmlFor="password" className="block">Contraseña:</label>
                                <div className="flex items-center justify-center">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full border border-gray-300 rounded p-1 focus:outline-none focus:border-blue-500 pr-8"
                                    />
                                    <div className="absolute right-0  flex items-center   pr-2">
                                        {showPassword ? (
                                            <HiEyeOff className='text-base text-gray-500' onClick={() => setShowPassword(false)} style={{ cursor: 'pointer' }} />
                                        ) : (
                                                <HiEye className='text-base text-gray-500' onClick={() => setShowPassword(true)} style={{ cursor: 'pointer' }} />
                                        )}
                                    </div>
                                </div>
                                {errors.password && <small className="text-red-500 text-sm">{errors.password}</small>}
                            </div>
                            <div className='flex justify-center items-center'>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white py-1 px-4 rounded"
                                    disabled={loading}
                                >
                                    {loading ? 'Cargando...' : 'Iniciar sesión'}
                                </button>
                            </div>
                        </form>
                    </Col>
                    <Col xs={24} sm={12} md={16} className="hidden sm:block">
                        <div className='ml-4 w-full h-full'>
                            <img src={Logo} alt="Imagen de login" className="w-full h-full object-cover" />
                        </div>
                    </Col>
                </Row>
            </Card>
            <Toaster richColors />
        </div>
    );
}

export default Login;