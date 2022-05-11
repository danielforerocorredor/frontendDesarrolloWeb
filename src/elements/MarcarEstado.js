import React from 'react';
import { useState, useEffect } from 'react';
import './style_envio.css';

function MarcarEstado(){
    const initialValues = {code: "", newState: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormValues({...formValues, [name]:value});
        console.log(formValues)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
        console.log(formValues);
        }
    }, [formErrors]);

    const validate = (values) =>{
        const errors = {};
        if(!values.code){
            errors.code = "Remitente es requerido";
        }
        if(!values.newState){
            errors.newState = "Destinatario es requerido";
        }
        return errors;
    }

    const handleOnSubmit = async () =>{
        let code = formValues.code;
        let newState = formValues.newState;
        let query = {code, newState};
        console.log("---");
        console.log(query);
        let result = await fetch(
          'https://taller2web.herokuapp.com/cambiar-estado',{
            method: "POST",
            body: JSON.stringify(query),
            headers: {
              'Content-Type': 'application/json'
          }
        });
        result = await result.json();
        console.warn(result);
        if(result){
          alert('Nuevo estado: ' + newState);
        }

    }

    return(
        <div className="wrapper fadeInDown">
            <div className="formContent">
              <h2 className="active"> Marcar estado </h2>
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  className="fadeIn first" 
                  name="code" 
                  placeholder="Código de envío" 
                  value={formValues.code}
                  onChange={handleChange}
                />
                <input 
                  type="text" 
                  className="fadeIn second" 
                  name="newState" 
                  placeholder="Nuevo estado"
                  value={formValues.newState}
                  onChange={handleChange} 
                />
                <input 
                  type="submit" 
                  className="fadeIn fourth" 
                  value="Marcar" 
                  onClick={handleOnSubmit}
                />
              </form>
            </div>
          </div>
    );
}

export default MarcarEstado;