import { Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import TermsOfService from '../pages/policies/TermsOfService';
import RefundPolicy from '../pages/policies/RefundPolicy';

function PoliciesRouter() {
  return (
    <Route path='/' element={<MainLayout />}>
      <Route path='policies/terms-of-service' element={<TermsOfService />} />
      <Route path='policies/refund-policy' element={<RefundPolicy />} />
    </Route>
  );
}

export default PoliciesRouter;
