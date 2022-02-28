import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
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

  const onChangeEvent = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]:value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/securities.json", {security: values}) 
      .then((response) => {
        navigate("/Ativos")
      })
      .catch((err) => {
        console.log(err);
      }); 
    console.log(values);
  }

  return (
  <Container fluid="sm" className="mt-4">
      <Form>
        <Row>
          <Form.Group className="mb-3" controlId="formInputNameFund">
            <Form.Label>Simbolo do Ativo</Form.Label>
          <Form.Control required name="security_simbol" type="text" placeholder="Entre com o simbolo do ativo" onChange={onChangeEvent} />
          </Form.Group>
            <Form.Group className="mb-3" controlId="formInputDesc">
            <Form.Label>Descrição do ativo</Form.Label>
            <Form.Control requires name="security_desc" type="text" placeholder="Descrição"  onChange={onChangeEvent} />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formINputDate">
              <Form.Label>Data de criação:</Form.Label>
              <Form.Control required name="creation_date" type="date" onChange={onChangeEvent} />
            </Form.Group>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row> 
        <Row>
          <Button type="submit" onClick={onSubmit}>
            Cadastrar
          </Button>
       </Row>
      </Form>
  </Container>
  );
}

export default FundCreation;
