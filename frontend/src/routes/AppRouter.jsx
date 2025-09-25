// router cho app
import { Routes, Route } from 'react-router-dom';
import MainRouter from './MainRouter';
import PoliciesRouter from './PoliciesRouter';
import CollectionsRouter from './CollectionsRouter';
import AccountRouter from './AccountRouter';
import Checkout from '../pages/Checkout';
import NotFound from '../pages/NotFound';
import PrivateRoute from '../components/PrivateRoute';

function AppRouter() {
  return (
    <Routes>
      {MainRouter()}
      {PoliciesRouter()}
      {CollectionsRouter()}
      {AccountRouter()}
      <Route
        path='/checkout'
        element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        }
      ></Route>
      <Route path='/*' element={<NotFound />}></Route>
    </Routes>
  );
}

export default AppRouter;
