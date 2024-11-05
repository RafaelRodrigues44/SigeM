import React, { useState } from 'react';

interface LoginProps {
  onLogin: (token: string) => void; 
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>(''); 

  const handleLoginClick = async () => {
    try {
      const response = await fetch('https://suaapi.com/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Falha ao fazer login. Verifique suas credenciais.');
      }

      const data = await response.json();
      onLogin(data.token); // Passa o token para o RootLayout
    } catch (error) {
      setError((error as Error).message); 
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom, #3a0088, #30cfd0)',
      }}
    >
      <div
        style={{
          width: '400px',
          padding: '40px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '30px', color: '#333', marginBottom: '10px', fontStyle: 'bolder' }}>Bem-vindo</h1>
        <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px', fontStyle: 'bolder' }}>
          Insira suas credenciais para acessar sua conta.
        </p>
        
        <input
          type="text"
          placeholder="Nome de Usuário"
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        />

        <button
          onClick={handleLoginClick}
          style={{
            width: '40%',
            padding: '10px',
            fontSize: '16px',
            color: '#fff',
            background: 'linear-gradient(to right, #6a11cb, #2575fc)',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Login
        </button>

        {error && (
          <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
        )}

        <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          Não tem uma conta? <a href="/register" style={{ color: '#2575fc', textDecoration: 'underline' }}>Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
