import { useRoutes } from 'raviger';
import { useContext } from 'react';
import AppContainer from '../components/AppContainer';
import { About, Form, Home, Login, Preview } from '../pages';
import { userContext } from '../utils';

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
  return <AppContainer>{route}</AppContainer>;
}
