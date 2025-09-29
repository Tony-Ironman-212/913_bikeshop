import { Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import All from '../pages/collections/All';
import SearchResults from '../pages/collections/SearchResults';
import Bike from '../pages/collections/Bike';
import Frame from '../pages/collections/Frame';
import Wheel from '../pages/collections/Wheel';
import ProductDetail from '../pages/collections/ProductDetail';

function CollectionsRouter() {
  return (
    <Route path='/' element={<MainLayout />}>
      <Route path='collections/all' element={<All />} />
      <Route path='collections/search' element={<SearchResults />} />
      <Route path='collections/bike' element={<Bike />} />
      <Route path='collections/frame' element={<Frame />} />
      <Route path='collections/wheel' element={<Wheel />} />
      <Route path='collections/products/:slug' element={<ProductDetail />} />
    </Route>
  );
}

export default CollectionsRouter;
