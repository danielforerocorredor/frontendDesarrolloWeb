import React from 'react';
import { useState, useEffect } from 'react';
import './style_envio.css';
import './table_style.css';

function EnvioAsociado(){
    const initialValues = {cc: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [info, setInfo] = useState([]);
    const [show, setShow] = useState(false);
    

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
        if(!values.cc){
            errors.cc = "Remitente es requerido";
        }
        return errors;
    }

    const handleOnSubmit = async () =>{
        let cc = formValues.cc;
        let query = {cc};
        console.log("---");
        console.log(query);
        let result = await fetch(
          'https://taller2web.herokuapp.com/consultar-envios',{
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
    }

    console.log(info[1]);

    return(
        <div className="wrapper fadeInDown">
            <div className="formContent">
              <h2 className="active"> Envios Cliente </h2>
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  className="fadeIn first" 
                  name="cc" 
                  placeholder="Cédula usuario" 
                  value={formValues.cc}
                  onChange={handleChange}
                />
                <input 
                  type="submit" 
                  className="fadeIn fourth" 
                  value="Consultar" 
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
                {info.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.code}</td>
                      <td>{val.state}</td>
                      <td>{val.receiver}</td>
                      <td>{val.name_from}</td>
                      <td>{val.cc_receiver}</td>
                      <td>{val.cc_from}</td>
                    </tr>
                  )
                })}
              </table>:null
              }
          </div>
    );
}

export default EnvioAsociado;