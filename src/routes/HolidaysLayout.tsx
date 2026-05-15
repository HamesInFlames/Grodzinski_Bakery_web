import { Outlet } from 'react-router-dom';

export default function HolidaysLayout() {
  return (
    <div className="holidays-layout">
      <Outlet />
    </div>
  );
}
