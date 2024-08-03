// components/Nav.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Nav: React.FC = () => {
  const [showMachinesSubmenu, setShowMachinesSubmenu] = useState(false);

  const toggleMachinesSubmenu = () => {
    setShowMachinesSubmenu(!showMachinesSubmenu);
  };

  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4 text-center">
      <ul className="space-y-2">
        <li className="hover:bg-gray-700 p-2 rounded">
          <button onClick={toggleMachinesSubmenu} className="w-full text-left text-center">
            Máquinas
          </button>
          {showMachinesSubmenu && (
            <ul className="pl-4 space-y-2">
              <li className="hover:bg-gray-700 p-2 rounded">
                <Link href="/machines/create">Cadastrar</Link>
              </li>
              {/* Adicione outras opções de submenu para Máquinas aqui */}
            </ul>
          )}
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link href="/maintenance">Manutenções</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link href="/inventory">Estoque</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link href="/teams">Equipes</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link href="/reports">Relatórios</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link href="/profile">Perfil</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link href="/admin">Administração</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
