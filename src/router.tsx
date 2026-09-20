import { createBrowserRouter, Navigate } from 'react-router-dom'
import AccountTypeSelection from './screens/customer/AccountTypeSelection'
import Categories from './screens/customer/Categories'
import EventTypeSelection from './screens/customer/EventTypeSelection'
import Explore from './screens/customer/Explore'
import Favorites from './screens/customer/Favorites'
import Home from './screens/customer/Home'
import LoginSignUp from './screens/customer/LoginSignUp'
import MyEvent from './screens/customer/MyEvent'
import Notifications from './screens/customer/Notifications'
import Profile from './screens/customer/Profile'
import ProviderProfile from './screens/customer/ProviderProfile'
import ServiceDetails from './screens/customer/ServiceDetails'
import SplashScreen from './screens/customer/SplashScreen'
import WelcomeOnboarding from './screens/customer/WelcomeOnboarding'
import ProviderDashboard from './screens/provider/ProviderDashboard'
import ProviderOnboarding from './screens/provider/ProviderOnboarding'
import ProviderProfileSettings from './screens/provider/ProviderProfileSettings'
import ProviderRequests from './screens/provider/ProviderRequests'
import ProviderServices from './screens/provider/ProviderServices'
import ServiceForm from './screens/provider/ServiceForm'
import AdminActivity from './screens/admin/AdminActivity'
import AdminContent from './screens/admin/AdminContent'
import AdminOverview from './screens/admin/AdminOverview'
import AdminProviders from './screens/admin/AdminProviders'
import AdminStatistics from './screens/admin/AdminStatistics'
import AdminUsers from './screens/admin/AdminUsers'

/**
 * Route structure.
 *
 * Customer App (Section 5.A) — all 15 screens are real.
 * Service Provider App (Section 5.B) — all screens are real, under
 * /provider-app/... (distinct from the customer-facing public profile at
 * /provider/:id).
 * Admin App (Section 5.C) — all 6 screens are real, under /admin/...
 * No real auth gate — reachable via a small "Admin" link on /login, or
 * directly at /admin (redirects to /admin/overview).
 */
export const router = createBrowserRouter([
  { path: '/', element: <SplashScreen /> },
  { path: '/onboarding', element: <WelcomeOnboarding /> },
  { path: '/login', element: <LoginSignUp /> },
  { path: '/choose-account-type', element: <AccountTypeSelection /> },
  { path: '/home', element: <Home /> },
  { path: '/select-event-type', element: <EventTypeSelection /> },
  { path: '/explore', element: <Explore /> },
  { path: '/categories', element: <Categories /> },
  { path: '/service/:id', element: <ServiceDetails /> },
  { path: '/provider/:id', element: <ProviderProfile /> },
  { path: '/favorites', element: <Favorites /> },
  { path: '/my-event', element: <MyEvent /> },
  { path: '/notifications', element: <Notifications /> },
  { path: '/profile', element: <Profile /> },

  { path: '/provider-app/onboarding', element: <ProviderOnboarding /> },
  { path: '/provider-app/dashboard', element: <ProviderDashboard /> },
  { path: '/provider-app/services', element: <ProviderServices /> },
  { path: '/provider-app/services/new', element: <ServiceForm /> },
  { path: '/provider-app/services/:serviceId/edit', element: <ServiceForm /> },
  { path: '/provider-app/requests', element: <ProviderRequests /> },
  { path: '/provider-app/profile', element: <ProviderProfileSettings /> },

  { path: '/admin', element: <Navigate to="/admin/overview" replace /> },
  { path: '/admin/overview', element: <AdminOverview /> },
  { path: '/admin/users', element: <AdminUsers /> },
  { path: '/admin/providers', element: <AdminProviders /> },
  { path: '/admin/content', element: <AdminContent /> },
  { path: '/admin/activity', element: <AdminActivity /> },
  { path: '/admin/statistics', element: <AdminStatistics /> },
])
