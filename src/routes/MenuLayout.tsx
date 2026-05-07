import { Outlet } from 'react-router-dom';

export default function MenuLayout() {
  return (
    <div className="menu-layout">
      <Outlet />
      {/* Reserved sticky bottom slot for Phase 2 MiniCartBar */}
      <div className="menu-layout__bottom-slot" />
    </div>
  );
}
