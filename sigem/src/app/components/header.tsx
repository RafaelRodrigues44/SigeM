// components/Header.tsx
import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center" style={{ maxHeight: '100px' }}>
      <div className="flex-shrink-0 flex items-center">
        <Image src="/logo2.png" alt="Logo" width={500} height={500} className="h-auto w-auto max-h-full" />
      </div>
      <div className="flex-grow text-center">
        <h1 className="text-2xl font-bold">
          SIGeM - Sistema de Gerenciamento de Manutenção
        </h1>
      </div>
    </header>
  );
};

export default Header;
