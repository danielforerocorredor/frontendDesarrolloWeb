import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import EnvioMasivo from './elements/EnvioMasivo';
import EnviarPaquete from './elements/EnviarPaquete';
import Estado from './elements/Estado';
import MarcarEstado from './elements/MarcarEstado';
import EnvioAsociado from './elements/EnvioAsociado';
import Nav from './elements/Nav';


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/enviarPaquete" exact element={<EnviarPaquete />} />
          <Route path="/estado" exact element={<Estado />} />
          <Route path="/marcarEstado" exact element={<MarcarEstado />} />
          <Route path="/envioAsociado" exact element={<EnvioAsociado />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
