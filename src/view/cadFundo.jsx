import React, { useState } from 'react'; 
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from "axios"; 


const initialValue = {name_fund: "", desc_fund: "", creation_date: ""};


const FundCreation = () => {
  const [values, setValues] = useState(initialValue);
  console.log({fund: values}); 
  
  const onChangeEvent = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]:value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/funds.json", {fund: values}) 
      .then((response) => {
        console.log("enviei");
      })
      .catch((err) => {
        console.log(err);
      }); 
  }

  return (
  <Container fluid="sm" className="mt-4">
      <Form>
        <Row>
          <Form.Group className="mb-3" controlId="formInputNameFund">
            <Form.Label>Nome do Fundo</Form.Label>
          <Form.Control required name="name_fund" type="text" placeholder="Entre com o Nome do Fundo" onChange={onChangeEvent} />
          </Form.Group>
            <Form.Group className="mb-3" controlId="formInputDesc">
            <Form.Label>Descrição sobre o fundo:</Form.Label>
            <Form.Control requires name="desc_fund" type="text" placeholder="Descrição"  onChange={onChangeEvent} />
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
