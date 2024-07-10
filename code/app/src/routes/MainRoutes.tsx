import { lazy } from 'react'

import { Loadable } from 'components'

import CommonLayout from 'layout/CommonLayout'
import MainLayout from 'layout/MainLayout'
import AuthGuard from 'utils/route-guard/AuthGuard'

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')))
const MaintenanceError500 = Loadable(
  lazy(() => import('pages/maintenance/500'))
)
const MaintenanceUnderConstruction = Loadable(
  lazy(() => import('pages/maintenance/under-construction'))
)
const MaintenanceComingSoon = Loadable(
  lazy(() => import('pages/maintenance/coming-soon'))
)

const Profile = Loadable(lazy(() => import('pages/user-profile')))
const HomePage = Loadable(lazy(() => import('pages/home')))

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'home',
          element: <HomePage />,
        },
        {
          path: 'profile',
          element: <Profile />,
        },
      ],
    },
    {
      path: '/maintenance',
      element: <CommonLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />,
        },
        {
          path: '500',
          element: <MaintenanceError500 />,
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />,
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />,
        },
      ],
    },
    {
      path: '*',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
    },
  ],
}

export default MainRoutes
