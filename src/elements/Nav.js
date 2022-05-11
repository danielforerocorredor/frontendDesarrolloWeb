import React from 'react';
import './style_home.css';
import {Link} from 'react-router-dom';

function Nav(){
    return(
        <nav>
            <ul className="snip1143">
                <Link to="/enviarPaquete"><li>Enviar Paquete</li></Link>
                <Link to="/estado"><li>Estado de Envío</li></Link>
                <Link to="/marcarEstado"><li>Marcar Estado de Envío</li></Link>
                <Link to="/envioAsociado"><li>Envíos Asociados a un Cliente</li></Link>
            </ul>
        </nav>
    );
}

export default Nav;