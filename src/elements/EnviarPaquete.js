import React from 'react';
import { useState, useEffect } from 'react';
import './style_envio.css';

function EnviarPaquete(){
    const initialValues = {name_from: "", receiver: "", state: "Recibido", cc_receiver: "", cc_from: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [info, setInfo] = useState([]);



    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormValues({...formValues, [name]:value});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
        }
    }, [formErrors]);

    const validate = (values) =>{
        const errors = {};
        if(!values.name_from){
            errors.name_from = "Remitente es requerido";
        }
        if(!values.receiver){
            errors.receiver = "Destinatario es requerido";
        }
        if(!values.cc_receiver){
            errors.cc_receiver = "Cédula destinatario es requerida";
        }
        if(!values.cc_from){
            errors.cc_from = "Cédula remitente es requerida";
        }
        return errors;
    }

    const handleOnSubmit = async () =>{
        let name_from = formValues.name_from;
        let receiver = formValues.receiver;
        let state = formValues.state;
        let cc_receiver = formValues.cc_receiver;
        let cc_from = formValues.cc_from;
        let query = {name_from, receiver, state, cc_receiver, cc_from};
        console.log("---");
        console.log(query);
        let result = await fetch(
          'http://localhost:10013/enviarPaquete',{
            method: "POST",
            body: JSON.stringify(query),
            headers: {
              'Content-Type': 'application/json'
          }
          });
          result = await result.json();
          console.warn(result);
          if (result){
            let code = result.Code;
            console.log(code);
            alert("Paquete subido correctamente con código: " + code);
          }
    }


    console.log(info);

    return(
        <div className="wrapper fadeInDown">
            <div className="formContent">
              <h2 className="active"> Enviar Paquete </h2>
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  className="fadeIn first" 
                  name="name_from" 
                  placeholder="Remitente" 
                  value={formValues.name_from}
                  onChange={handleChange}
                />
                <input 
                  type="text" 
                  className="fadeIn second" 
                  name="receiver" 
                  placeholder="Destinatario"
                  value={formValues.receiver}
                  onChange={handleChange} 
                />
                <input 
                  type="text" 
                  className="fadeIn third" 
                  name="cc_receiver" 
                  placeholder="CC destinatario"
                  value={formValues.cc_receiver}
                  onChange={handleChange} 
                />
                <input 
                  type="text" 
                  className="fadeIn third" 
                  name="cc_from" 
                  placeholder="CC remitente" 
                  value={formValues.cc_from}
                  onChange={handleChange}
                />
                <input 
                  type="submit" 
                  className="fadeIn fourth" 
                  value="Enviar" 
                  onClick={handleOnSubmit}
                />
              </form>
              <div>
            </div>
            </div>
            
          </div>
    );
}

export default EnviarPaquete;