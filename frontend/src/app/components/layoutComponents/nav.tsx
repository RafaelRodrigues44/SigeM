'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaCogs, FaTools, FaBoxes, FaAddressBook, FaChartLine, FaUser, FaBars, FaTachometerAlt, FaUsers, FaPeopleCarry, FaBriefcase } from 'react-icons/fa'; // Importando o ícone para Serviços

const Nav: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className={`bg-gray-800 text-white ${isExpanded ? 'w-60' : 'w-18'} h-screen p-3 transition-all duration-300 flex flex-col`}>
      <button 
        className="text-white mb-4 ml-2" 
        onClick={toggleNav}
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <FaBars size={28} />
      </button>
      <ul className="flex flex-col space-y-2 overflow-hidden">
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/maintenance" className="flex items-center">
            <FaTools size={24} />
            {isExpanded && <span className="ml-3">Manutenções</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/machines" className="flex items-center">
            <FaCogs size={24} />
            {isExpanded && <span className="ml-3">Máquinas</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/stock" className="flex items-center">
            <FaBoxes size={24} />
            {isExpanded && <span className="ml-3">Estoque</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/services" className="flex items-center"> 
            <FaBriefcase size={24} />
            {isExpanded && <span className="ml-3">Serviços</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/collaborator" className="flex items-center">
            <FaAddressBook size={24} />
            {isExpanded && <span className="ml-3">Colaboradores</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/teams" className="flex items-center">
            <FaUsers size={24} />
            {isExpanded && <span className="ml-3">Equipes</span>}
          </Link>
        </li>   
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/suppliers" className="flex items-center">
            <FaPeopleCarry size={24} />
            {isExpanded && <span className="ml-3">Fornecedores</span>}
          </Link>
        </li>   
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/dashboard" className="flex items-center">
            <FaTachometerAlt size={24} />
            {isExpanded && <span className="ml-3">Dashboard</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/pages/profile" className="flex items-center">
            <FaUser size={24} />
            {isExpanded && <span className="ml-3">Perfil</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
