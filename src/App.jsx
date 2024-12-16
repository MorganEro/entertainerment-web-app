import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import GlobalStyles from './styles/GlobalStyles';
import ProtectedRoute from './ui/ProtectedRoute';
import { lazy, Suspense } from 'react';
import Spinner, { FullPageSpinner } from './ui/Spinner';

// import Home from './pages/Home';
// import Login from './pages/Login';
// import Movies from './pages/Movies';
// import TvSeries from './pages/TvSeries';
// import Bookmarks from './pages/Bookmarks';
// import PageNotFound from './pages/PageNotFound';
// import UserSettings from './pages/UserSettings';
// import SignUp from './features/authentication/SignUp';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Movies = lazy(() => import('./pages/Movies'));
const TvSeries = lazy(() => import('./pages/TvSeries'));
const Bookmarks = lazy(() => import('./pages/Bookmarks'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const UserSettings = lazy(() => import('./pages/UserSettings'));
const SignUp = lazy(() => import('./features/authentication/SignUp'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Suspense fallback={<FullPageSpinner />}>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
              <Route
                index
                element={
                  <Navigate
                    replace
                    to="home"
                  />
                }
              />
              <Route
                path="home"
                element={<Home />}
              />
              <Route
                path="movies"
                element={<Movies />}
              />
              <Route
                path="tvSeries"
                element={<TvSeries />}
              />
              <Route
                path="bookmarks"
                element={<Bookmarks />}
              />
              <Route
                path="userSettings"
                element={<UserSettings />}
              />
            </Route>
            <Route
              path="login"
              element={<Login />}
            />
            <Route
              path="signUp"
              element={<SignUp />}
            />
            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster
        position="bottom-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 7000,
            style: {
              background: 'var(--color-white)',
              color: 'var(--color-semi-dark-blue)',
            },
          },
          error: {
            duration: 7000,
            icon: '',
            style: {
              background: 'var(--color-red)',
              color: 'var(--color-white)',
            },
          },
          style: {
            fontSize: 'var(--font-size-sm)',
            maxWidth: '500px',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--border-radius-md)',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
