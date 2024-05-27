import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const EquipmentsPage = lazy(() => import('src/pages/equipments'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router({ isAuthenticated, setIsAuthenticated }) {
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
        { path: 'equipments', element: <EquipmentsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    
    
  ]);

  return routes;
}
