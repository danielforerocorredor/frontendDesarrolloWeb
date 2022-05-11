import React from 'react';
import './style_envio.css';

function EnvioMasivo(){
    return(
        <div className="wrapper fadeInDown">
            <div className="formContent">
              <h2 className="active"> Envio Masivo </h2>
              <form >
                <input type="file" className="fadeIn third" name="fileupload" placeholder="Subir csv" />
                <input type="submit" className="fadeIn fourth" value="Subir" />
              </form>
            </div>
          </div>
    );
}

export default EnvioMasivo;