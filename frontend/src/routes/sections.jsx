import { lazy, Suspense, useState } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const EventPage = lazy(() => import('src/pages/event'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const EquipmentsPage = lazy(() => import('src/pages/equipments'));
export const BookingPage = lazy(() => import('src/pages/booking'));
export const StoragePage = lazy(() => import('src/pages/storage'));
export const EquipmentDetailsPage = lazy(() => import('src/pages/equipment-details'));
export const EventDetailsPage = lazy(() => import('src/pages/event-details'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router({ isAuthenticated, setIsAuthenticated, isStaff, setIsStaff, isAdmin, setIsAdmin }) {
  const [chosenItems, setChosenItems] = useState([]);
  const [bookingOrders, setBookingOrders] = useState([]);
  

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout isAuthenticated={isAuthenticated} chosenItems={chosenItems}  bookingOrders = {bookingOrders} isStaff ={isStaff} setIsAuthenticated={setIsAuthenticated} setIsStaff={setIsStaff} 
        setIsAdmin={setIsAdmin} >
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage isAuthenticated={isAuthenticated} />, index: true  },
        { path: 'Profile', element: <ProfilePage /> },
        { path: 'user', element: <UserPage isAdmin = {isAdmin} isStaff = {isStaff}/> },
        { path: 'equipments', element: <EquipmentsPage isStaff={isStaff} /> },
        { path: 'storage', element: <StoragePage /> },
        { path: 'equipment-details/:equipmentTypeId', element: <EquipmentDetailsPage setChosenItems={setChosenItems} isStaff={isStaff} isAuthenticated = {isAuthenticated}/> },
        { path: 'event-details/:eventId', element: <EventDetailsPage isAuthenticated={isAuthenticated} /> },
        { path: 'booking', element: <BookingPage  chosenItems={chosenItems} setBookingOrders = {setBookingOrders}/> },
        { path: 'events', element: <EventPage isAuthenticated = {isAuthenticated}/> },
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
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);

  return routes;
}
