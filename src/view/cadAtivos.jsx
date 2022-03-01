import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from "axios"; 


const initialValue = {security_simbol: "", security_desc: "", creation_date: ""};


const FundCreation = () => {
  const [values, setValues] = useState(initialValue);
  const navigate = useNavigate();
  const {id} = useParams() || null;
  const buttonText = id ? "Atualizar" : "Cadastrar"; 

  const onChangeEvent = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]:value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const method = id ? "put" : "post";
    
    axios[method](`http://localhost:3001/securities${id ? `/${id}` : ''}.json`, {security: values}) 
      .then((response) => {
        navigate("/Ativos")
      })
      .catch((err) => {
        console.log(err);
      }); 
    console.log(values);
  }
  
  useEffect(() => {
  if (id) {
   axios.get(`http://localhost:3001/securities/${id}.json`) 
      .then((resp) => {
         setValues(resp.data);
      })
      .catch((err) => {
        console.log("Error: ", err); 
      });
  } 
}, []);



  return (
  <Container fluid="sm" className="mt-4">
      <Form>
        <Row>
          <Form.Group className="mb-3" controlId="formInputNameFund">
            <Form.Label>Simbolo do Ativo</Form.Label>
          <Form.Control required name="security_simbol" type="text" placeholder="Entre com o simbolo do ativo" value={values.security_simbol} onChange={onChangeEvent} />
          </Form.Group>
            <Form.Group className="mb-3" controlId="formInputDesc">
            <Form.Label>Descrição do ativo</Form.Label>
            <Form.Control requires name="security_desc" type="text" placeholder="Descrição" value={values.security_desc}  onChange={onChangeEvent} />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formINputDate">
              <Form.Label>Data de criação:</Form.Label>
              <Form.Control required name="creation_date" type="date" value={values.creation_date} onChange={onChangeEvent} />
            </Form.Group>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row> 
        <Row>
          <Button type="submit" onClick={onSubmit}>
              {buttonText}
          </Button>
       </Row>
      </Form>
  </Container>
  );
}

export default FundCreation;
