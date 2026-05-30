import { Outlet } from 'react-router-dom';

export default function MenuLayout() {
  return (
    <div className="menu-layout">
      <Outlet />
    </div>
  );
}
