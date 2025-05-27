import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });
  
   const logout = () => {
    localStorage.removeItem("usuarioLogado"); // limpa localStorage
    setUsuario(null); // reseta estado
  };

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);