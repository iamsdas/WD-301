import { useRoutes } from 'raviger';
import AppContainer from '../components/AppContainer';
import { About, Form, Home, Login, Preview } from '../pages';

const routes = {
  '/': () => <Home />,
  '/about': () => <About />,
  '/login': () => <Login />,
  '/form/:formId': ({ formId }: { formId: string }) => (
    <Form formId={Number(formId)} />
  ),
  '/preview/:formId': ({ formId }: { formId: string }) => (
    <Preview formId={Number(formId)} />
  ),
};

export default function AppRouter(props: { currentUser: User }) {
  let route = useRoutes(routes);
  return <AppContainer currentUser={props.currentUser}>{route}</AppContainer>;
}
