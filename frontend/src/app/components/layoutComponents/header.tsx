'use client';

import React from 'react';
import Image from 'next/image';
import Avatar from '../interfaceComponents/avatar'; 
import ImageButton from '../interfaceComponents/imageButton'; 
import { useRouter } from 'next/navigation'; 

const HomeIcon: React.FC<{ width: number; height: number; style?: React.CSSProperties }> = ({ width, height, style }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 29 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path
      d="M12 3L2 12H5V21H11V15H13V21H19V12H22L12 3Z"
      fill="currentColor" 
    />
  </svg>
);

const Header: React.FC = () => {
  const router = useRouter(); 

  const handleGoHome = () => {
    router.push('/'); 
  };

  const user = {
    name: 'João da Silva',
    position: 'Analista de Sistemas',
    avatarUrl: 'https://i.pinimg.com/474x/2e/4f/d3/2e4fd3fd8f2aff9c26b15c1f1c23b11e.jpg', 
  };

  return (
    <header
      className="text-white p-4 flex justify-between items-center"
      style={{ 
        maxHeight: '65px', 
        backgroundColor: '#031821' 
      }}
    >
      <div className="flex items-center space-x-4">
        {/* Ícone da empresa */}
        <div style={{ marginTop: '10px' }}> 
          <Image src="/sigem.svg" alt="Logo" width={170} height={170} />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Botão para voltar para a página inicial */}
        <ImageButton 
          svg={<HomeIcon width={20} height={20} />} // Ajuste o tamanho conforme necessário
          onClick={handleGoHome} 
          color="#88898a" 
          marginLeft={10} // Adiciona uma margem à esquerda do botão, se necessário
        />

        {/* Foto do usuário e card de informações */}
        <Avatar src={user.avatarUrl} alt={user.name} size={50} />
        <div className="flex flex-col">
          <span className="text-sm font-bold">{user.name}</span>
          <span className="text-xs">{user.position}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
