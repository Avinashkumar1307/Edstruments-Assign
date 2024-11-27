import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!username.trim()) {
            validationErrors.username = 'Username is required';
        }
        if (!password.trim()) {
            validationErrors.password = 'Password is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const user = { username, password };
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(login(user));
        navigate('/tasks');
    };

    return (
        <div className="bg-sky-100 flex justify-center items-center w-[100vw] h-[100vh] overflow-hidden">
            {/* Left: Image */}
            <div className="w-1/2 h-screen hidden lg:block">
                <img
                    src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
                    alt="Placeholder Image"
                    className="object-cover w-full h-full"
                />
            </div>
            {/* Right: Login Form */}
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 className="text-2xl font-semibold mb-4">Login</h1>
                <form onSubmit={handleLogin}>
                    {/* Username Input */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autoComplete="off"
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>
                    {/* Password Input */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-800">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autoComplete="off"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    {/* Remember Me Checkbox */}
                    <div className="mb-4 flex items-center">
                        <input type="checkbox" id="remember" name="remember" className="text-red-500" />
                        <label htmlFor="remember" className="text-green-900 ml-2">
                            Remember Me
                        </label>
                    </div>
                    {/* Forgot Password Link */}
                    <div className="mb-6 text-blue-500">
                        <a href="#" className="hover:underline">
                            Forgot Password?
                        </a>
                    </div>
                    {/* Login Button */}
                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                    >
                        Login
                    </button>
                </form>
                {/* Sign up Link */}
                <div className="mt-6 text-green-500 text-center">
                    <a href="#" className="hover:underline">
                        Sign up Here
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
