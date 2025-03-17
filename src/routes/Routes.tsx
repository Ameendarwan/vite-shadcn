import { Routes as DOMRoutes, Route } from 'react-router-dom';

import Home from '@app/pages/Home';
import NotFound from '@app/pages/NotFound';
import { paths } from './Routes.utils';

const Routes = () => (
  <DOMRoutes>
    <Route path={paths.home} element={<Home />} />
    <Route path="*" element={<NotFound />} />
  </DOMRoutes>
);

export default Routes;
