
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '@/pages/Login';
import Grupo from '@/pages/Grupo';
import Usuario from '@/pages/Usuario';
import Donador from '@/pages/Donador';
import Donativo from '@/pages/Donativo';
import Donatorio from '@/pages/Donatorio';
import Categoria from '@/pages/Categoria';
import Dashboard from '@/pages/Dashboard';
import TipoDonante from '@/pages/TipoDonante';
import Coleccion from '@/pages/Coleccion'; 
import Layout from '@/components/layouts/Layout';
import ProtectedRoutes from '@/components/ProtectedRoutes';
import Estado from '@/pages/Estado';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <ProtectedRoutes >
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/usuario" element={<Usuario />} />
                <Route path="/categoria" element={<Categoria />} />
                <Route path="/tipo-donante" element={<TipoDonante />} />
                <Route path="/grupo" element={<Grupo />} />
                <Route path="/donador" element={<Donador />} />
                <Route path="/donativo" element={<Donativo />} />
                <Route path="/coleccion" element={<Coleccion />} />
                <Route path="/donatorio" element={<Donatorio />} />
                <Route path="/estados/:id_donativo" element={<Estado />} />
              </Routes>
            </Layout>
          </ProtectedRoutes >
        } />
      </Routes>
    </Router>
  );
}

export default App;

