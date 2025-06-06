import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#020d34] to-[#011270]">

      <Outlet />
    </div>
  );
};

export default Layout;
