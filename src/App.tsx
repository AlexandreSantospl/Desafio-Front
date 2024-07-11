import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { DrawerProvider } from './shared/context';

export const App = () => {
  return (
    <DrawerProvider>
      <BrowserRouter>
          <AppRoutes />
      </BrowserRouter>
    </DrawerProvider>
  );
};
