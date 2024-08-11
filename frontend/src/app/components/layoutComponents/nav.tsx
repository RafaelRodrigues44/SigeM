'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaCogs, FaTools, FaBoxes, FaUsers, FaChartLine, FaUser, FaBars, FaTachometerAlt } from 'react-icons/fa';

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
          <Link href="/machines" className="flex items-center">
            <FaCogs size={24} />
            {isExpanded && <span className="ml-3">Máquinas</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/maintenance" className="flex items-center">
            <FaTools size={24} />
            {isExpanded && <span className="ml-3">Manutenções</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/inventory" className="flex items-center">
            <FaBoxes size={24} />
            {isExpanded && <span className="ml-3">Estoque</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/teams" className="flex items-center">
            <FaUsers size={24} />
            {isExpanded && <span className="ml-3">Equipes</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/reports" className="flex items-center">
            <FaChartLine size={24} />
            {isExpanded && <span className="ml-3">Relatórios</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/profile" className="flex items-center">
            <FaUser size={24} />
            {isExpanded && <span className="ml-3">Perfil</span>}
          </Link>
        </li>
        <li className="flex items-center hover:bg-gray-700 p-2 rounded">
          <Link href="/admin" className="flex items-center">
            <FaTachometerAlt size={24} />
            {isExpanded && <span className="ml-3">Dashboard</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
