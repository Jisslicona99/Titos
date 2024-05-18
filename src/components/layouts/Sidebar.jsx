
import React from 'react';
import { HiOutlineHome, HiOutlineUser, HiOutlineUserAdd, HiOutlineUserCircle, HiViewGridAdd, HiOutlineClipboardList, HiOutlineIdentification, HiUserGroup, HiAcademicCap } from 'react-icons/hi';
import Logo from '@/assets/images/logo.png';
import MenuItem from '@/components/ui/Nav_item';
import '@/assets/css/Custom.css';
import useLayoutStore from '@/stores/store';

const Sidebar = () => {
  const { isOpen } = useLayoutStore();
  return (
    <div className={`bg-gray-800 text-white h-full fixed left-0 top-0`} style={{ width: isOpen ? '250px' : '70px', boxShadow: isOpen ? '1px 0px 5px rgba(0, 0, 0, 0.6)' : 'none', overflowY: 'hidden', zIndex: 99 }}>
      <div className='h-16'>
        <div className='flex items-center gap-2 justify-center h-full shadow-md'>
          <img className="h-6 w-17" src={Logo} alt="User avatar" />
          {isOpen && (
            <h2 className="text-bold">
              Titos
            </h2>
          )}
        </div>
      </div>
      <div className="mt-2" style={{ maxHeight: 'calc(100% - 64px)', overflowY: 'auto' }}>
        <div className='p-1 px-2'>
          <small className='text-gray-400 font-semibold text-xs'>MENU</small>
        </div>
        <ul>
          <MenuItem to="/dashboard" icon={<HiOutlineHome />} label={'Inicio'} />
          <MenuItem to="/usuario" icon={<HiOutlineUser />} label={'Usuarios'} />
          <MenuItem to="/categoria" icon={<HiOutlineClipboardList />} label={'Categorias'} />
          <MenuItem to="/tipo-donante" icon={<HiOutlineUserCircle />} label={'Tipo donante'} />
          <MenuItem to="/grupo" icon={<HiUserGroup />} label={'Grupo'} />
          <MenuItem to="/donador" icon={<HiOutlineIdentification />} label={'Donadores'} />
          <MenuItem to="/donativo" icon={<HiViewGridAdd />} label={'Donativos'} />
          <MenuItem to="/coleccion" icon={<HiAcademicCap />} label={'Colecciones'} />
          <MenuItem to="/donatorio" icon={<HiOutlineUserAdd />} label={'Donatorios'} />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;