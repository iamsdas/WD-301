import { useRoutes } from 'raviger';
import { lazy, Suspense, useContext } from 'react';
import AppContainer from '../components/AppContainer';
import { userContext } from '../utils';
import Loader from '../components/common/Loader';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Form = lazy(() => import('../pages/Form'));
const Login = lazy(() => import('../pages/Login'));
const Preview = lazy(() => import('../pages/Preview'));

export default function AppRouter() {
  const currentUser = useContext(userContext);
  const routes = {
    '/': () => <Home />,
    '/about': () => <About />,
    '/login': () => <Login />,
    '/form/:formId': ({ formId }: { formId: string }) =>
      !currentUser || !currentUser?.username ? (
        <Home />
      ) : (
        <Form formId={Number(formId)} />
      ),
    '/preview/:formId': ({ formId }: { formId: string }) => (
      <Preview formId={Number(formId)} />
    ),
  };

  let route = useRoutes(routes);
  return (
    <AppContainer>
      <Suspense fallback={<Loader />}>{route}</Suspense>
    </AppContainer>
  );
}
