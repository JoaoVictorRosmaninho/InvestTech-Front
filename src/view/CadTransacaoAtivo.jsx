import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from "axios";

/* values to send to the api*/
const initialValue = {desc_transaction: "", value_transaction: "", date_transaction: "",  fund_id: "", security_id: "", quantity: ""};

/* Link do request the api*/

const FundCreation = () => {
  const [values, setValues] = useState(initialValue);
  const [funds, setFunds] = useState([]);
  const [security, setSecuritys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      axios
        .get("http://localhost:3001/funds")
          .then((resp) => { setFunds(resp.data); })
          .catch((err) => { console.log(err); });
    }, []);

  useEffect(() => {
      axios
        .get("http://localhost:3001/securities")
          .then((resp) => { setSecuritys(resp.data); })
          .catch((err) => { console.log(err); });
    }, []);
  
  const onChangeEvent = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]:value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/securitys_transactions.json", {security_transactions: values}) 
      .then((response) => {
        navigate("/transacaoAtivos") 
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
            <Form.Group className="mb-3" controlId="formInputDesc">
            <Form.Label>Descrição sobre a Transação:</Form.Label>
            <Form.Control requires name="desc_transaction" type="text" placeholder="Descrição"  onChange={onChangeEvent} />
          </Form.Group>
        </Row>
        <Row>
            <Form.Group className="mb-3" controlId="formInputDesc">
            <Form.Label>Valor:</Form.Label>
            <Form.Control requires name="value_transaction" type="text" placeholder="Descrição"  onChange={onChangeEvent} />
          </Form.Group>
        </Row>
        <Row>
            <Form.Group className="mb-3" controlId="formInputDesc">
            <Form.Label>Quantidade:</Form.Label>
            <Form.Control requires name="quantity" type="text" placeholder="Quantidade"  onChange={onChangeEvent} />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formINputDate">
              <Form.Label>Data de efetuação:</Form.Label>
              <Form.Control required name="date_transaction" type="date" onChange={onChangeEvent} />
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
                {funds.map((e) => {
                  return (<option value={e.id} name="fund_id">{e.name_fund}</option>)
                })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col></Col>
          <Col></Col>
         </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Selecione o Ativo</Form.Label>
              <Form.Select id="disabledSelect" name="security_id" onChange={onChangeEvent}> 
                <option>Selecione o Ativo</option>
                {security.map((e) => {
                  return (<option value={e.id} name="security_id">{e.security_simbol}</option>)
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
