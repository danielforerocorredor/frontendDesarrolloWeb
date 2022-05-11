import React from 'react';
import { useState, useEffect } from 'react';
import './style_envio.css';
import './table_style.css';


function Estado(){
    const initialValues = {typeConsult: "", data: ""};
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
        if(!values.typeConsult){
            errors.typeConsult = "Remitente es requerido";
        }
        if(!values.data){
            errors.data = "Destinatario es requerido";
        }
        return errors;
    }

    const [info, setInfo] = useState({});
    const [show, setShow] = useState(false);
    
    const handleOnSubmit = async () =>{
        let typeConsult = formValues.typeConsult;
        let data = formValues.data;
        let query = {typeConsult, data};
        console.log("---");
        console.log(query);
        let result = await fetch(
          'https://taller2web.herokuapp.com/estado-envio',{
            method: "POST",
            body: JSON.stringify(query),
            headers: {
              'Content-Type': 'application/json'
          }
          });
          result = await result.json();
          console.warn(result);
          setInfo(result);
          setShow(true);
          if (result){
            console.log(info);
          }
    }
  

    return(
        <div className="wrapper fadeInDown">
            <div className="formContent">
              <h2 className="active"> Cambiar estado </h2>
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  className="fadeIn first" 
                  name="typeConsult" 
                  placeholder="COD para código o CC para cédula" 
                  value={formValues.typeConsult}
                  onChange={handleChange}
                />
                <input 
                  type="text" 
                  className="fadeIn second" 
                  name="data" 
                  placeholder="COD o CC"
                  value={formValues.data}
                  onChange={handleChange} 
                />
                <input 
                  type="submit" 
                  className="fadeIn fourth" 
                  value="Enviar" 
                  onClick={handleOnSubmit}
                />
              </form>
            </div>
            <br></br><br></br><br></br><br></br>
            {
                show?<table>
                <tr>
                  <th>Código</th>
                  <th>Estado</th>
                  <th>Destinatario</th>
                  <th>Remitente</th>
                  <th>Cédula destinatario</th>
                  <th>Cédula remitente</th>
                </tr>
                <tr>
                  <th>{info.Code}</th>
                  <th>{info.CurrentState}</th>
                  <th>{info.Receiver}</th>
                  <th>{info.From}</th>
                  <th>{info.CC_receiver}</th>
                  <th>{info.CC_from}</th>
                </tr>
              </table>:null
              }
          </div>
    );
}


export default Estado;