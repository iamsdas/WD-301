import { useRoutes } from 'raviger';
import About from '../pages/About';
import AppContainer from '../components/AppContainer';
import Form from '../pages/Form';
import Home from '../pages/Home';
import Preview from '../pages/Preview';

const routes = {
  '/': () => <Home />,
  '/about': () => <About />,
  '/form/:formId': ({ formId }: { formId: string }) => (
    <Form formId={Number(formId)} />
  ),
  '/preview/:formId': ({ formId }: { formId: string }) => (
    <Preview formId={Number(formId)} />
  ),
};

export default function AppRouter() {
  let route = useRoutes(routes);
  return <AppContainer>{route}</AppContainer>;
}
