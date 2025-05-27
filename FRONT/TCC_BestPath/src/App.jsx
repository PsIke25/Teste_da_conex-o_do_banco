import AppRoutes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import Navbar from './components/navbar/Navbar';

function App() {

  return (
  <AuthProvider>
    <Navbar />
    <AppRoutes />
  </AuthProvider>  
  );
}

export default App