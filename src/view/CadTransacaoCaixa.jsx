import React, { useState, useEffect } from 'react'; 
import AsyncSelect from "react-select/async";
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from "axios";

/* values to send to the api*/
const initialValue = {desc_transaction: "", valor_transaction: "", data_transection: "",  fund_id: ""};

/* Link do request the api*/
const baseUrl = "http://localhost:3001/fundos"; 

const FundCreation = () => {
  const [values, setValues] = useState(initialValue);
  const [data, setData] = useState([]);

  useEffect(() => {
      axios
        .get(baseUrl)
          .then((resp) => { setData(resp.data); })
          .catch((err) => { console.log(err); });
    }, []);
  
  const onChangeEvent = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]:value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/cash_transactions.json", {cash_transaction: values}) 
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
            <Form.Group className="mb-3" controlId="formInputDesc">
            <Form.Label>Descrição sobre a Transação:</Form.Label>
            <Form.Control requires name="desc_transaction" type="text" placeholder="Descrição"  onChange={onChangeEvent} />
          </Form.Group>
        </Row>
        <Row>
            <Form.Group className="mb-3" controlId="formInputDesc">
            <Form.Label>Valor:</Form.Label>
            <Form.Control requires name="valor_transaction" type="text" placeholder="Descrição"  onChange={onChangeEvent} />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formINputDate">
              <Form.Label>Data de efetuação:</Form.Label>
              <Form.Control required name="data_transection" type="date" onChange={onChangeEvent} />
            </Form.Group>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Selecione o Fundo</Form.Label>
              <Form.Select id="disabledSelect" name="fund_id" onChange={onChangeEvent}> 
                <option>Selecione o Fundo</option>
                {data.map((e) => {
                  return (<option value={e.id} name="fund_id">{e.name_fund}</option>)
                })}
              </Form.Select>
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
