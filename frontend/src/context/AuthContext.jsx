import { createContext, useContext, useMemo, useState } from 'react';
import { api } from '../lib/api.js';

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('careertrack_user') || 'null'));
  async function authenticate(path, payload) { const data = await api(path, { method: 'POST', body: JSON.stringify(payload) }); localStorage.setItem('careertrack_token', data.token); localStorage.setItem('careertrack_user', JSON.stringify(data.user)); setUser(data.user); return data; }
  function logout() { localStorage.removeItem('careertrack_token'); localStorage.removeItem('careertrack_user'); setUser(null); }
  const value = useMemo(() => ({ user, register: (p) => authenticate('/auth/register', p), login: (p) => authenticate('/auth/login', p), logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() { return useContext(AuthContext); }

