import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui entra a lógica de autenticação
    console.log('Login:', email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1C2526]">
      <div className="bg-[#2E2E2E] p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#E0E0E0] mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[#E0E0E0] mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#00A3E0]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#E0E0E0] mb-2">Senha</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#00A3E0]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#00A3E0] hover:bg-blue-600 text-white font-bold p-2 rounded transition duration-200"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
