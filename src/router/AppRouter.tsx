import { useRoutes } from 'raviger';
import About from '../components/About';
import AppContainer from '../components/AppContainer';
import Form from '../components/Form';
import Home from '../components/Home';

const routes = {
  '/': () => <Home />,
  '/about': () => <About />,
  '/form/:id': ({ id }: { id: string }) => <Form formId={Number(id)} />,
};

export default function AppRouter() {
  let route = useRoutes(routes);
  return <AppContainer>{route}</AppContainer>;
}
