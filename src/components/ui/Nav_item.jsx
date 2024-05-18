import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Tooltip } from 'antd';
import useLayoutStore from '@/stores/store';
const MenuItem = ({ to, icon, label }) => {
  const { isOpen } = useLayoutStore();
  const location = useLocation();

  return (
    <li className={`py-1 shadow-sm px-2`}>
      {isOpen ? (
        <NavLink
          to={to}
          className={`flex text-lg items-center w-full gap-2 ${location.pathname === to ? 'bg-slate-500' : ''} text-gray-400 hover:bg-slate-600 hover:text-white rounded-lg p-1`}
        >
          {icon}
          {isOpen && <span>{label}</span>}
        </NavLink>
      ) : (
        <Tooltip title={label} placement="right">
          <NavLink
            to={to}
            className={`flex text-lg items-center justify-center w-full gap-2 ${location.pathname === to ? 'bg-slate-500' : ''} text-gray-400 hover:bg-slate-600 hover:text-white rounded-lg p-1`}
          >
            {icon}
            {isOpen && <span>{label}</span>}
          </NavLink>
        </Tooltip>
      )}
    </li>
  );
};

export default MenuItem;
