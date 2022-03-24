import { useRoutes } from 'raviger';
import About from '../pages/About';
import AppContainer from '../components/AppContainer';
import Form from '../pages/Form';
import Home from '../pages/Home';
import Preview from '../pages/Preview';

const routes = {
  '/': () => <Home />,
  '/about': () => <About />,
  '/form/:id': ({ id }: { id: string }) => <Form formId={Number(id)} />,
  '/preview/:id': ({ id }: { id: string }) => <Preview formId={Number(id)} />,
};

export default function AppRouter() {
  let route = useRoutes(routes);
  return <AppContainer>{route}</AppContainer>;
}
