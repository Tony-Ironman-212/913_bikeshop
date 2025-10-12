import { Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Privacy from '../pages/Privacy';
import Faq from '../pages/Faq';
import Contact from '../pages/Contact';

function MainRouter() {
  return (
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Home />}></Route>
      <Route path='privacy' element={<Privacy />}></Route>
      <Route path='faq' element={<Faq />}></Route>
      <Route path='contact' element={<Contact />}></Route>
    </Route>
  );
}

export default MainRouter;
