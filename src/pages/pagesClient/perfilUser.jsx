import React from 'react'
import SidebarProfiles from '../../components/sidebar-profiles';
import { Outlet} from 'react-router-dom';

function PerfilUser() {
    const userContent = [
        { label: "Mi informacion", path: "/ProfileUser/InfoProfileUser" },
        { label: "Historial e Informacion", path: "/ProfileUser/InfoSoliUser" }
    ];


  return (
    <div className='flex h-screen'>
        <SidebarProfiles content={userContent} />

        <div className='flex-1 p-[20px] pt-[80px] bg-gray-200 overflow-y-auto'>
            <Outlet />
        </div>
    </div>
  )
}

export default PerfilUser