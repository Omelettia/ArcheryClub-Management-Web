import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const BookingPage = lazy(() => import('src/pages/booking'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const EquipmentsPage = lazy(() => import('src/pages/equipments'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router({ isAuthenticated, setIsAuthenticated, isStaff, setIsStaff,isAdmin,setIsAdmin }) {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout isAuthenticated={isAuthenticated}>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'Profile', element: <ProfilePage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'equipments', element: <EquipmentsPage isStaff={isStaff} /> },
        { path: 'booking', element: <BookingPage /> },
      ],
    },
    {
      path: 'login',
      element: (
        <LoginPage 
          setIsAuthenticated={setIsAuthenticated} 
          setIsStaff={setIsStaff} 
          setIsAdmin={setIsAdmin}
        />
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    
    
  ]);

  return routes;
}
