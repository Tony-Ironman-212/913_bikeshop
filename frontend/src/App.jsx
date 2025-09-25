import AppRouter from './routes/AppRouter';
import { AuthProvider } from './context/authContext';

function App() {
  console.log('✅App render thành công');
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
