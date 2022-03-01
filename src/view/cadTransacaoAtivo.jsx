import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from "axios";

/* values to send to the api*/
const initialValue = {desc_transaction: "", value_transaction: "", date_transaction: "",  fund_id: "", security_id: "", quantity: ""};

/* Link do request the api*/

const TransactionSecurity = () => {
  const [values, setValues] = useState(initialValue);
  const [funds, setFunds] = useState([]);
  const [security, setSecuritys] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams() || null;
  const buttonText = id ? "Atualizar" : "Cadastrar"; 

  useEffect(() => {
    if (id) {
       axios.get(`http://localhost:3001/securitys_transactions/${id}.json`)
        .then((resp) => {
          setValues(resp.data)
        })
        .catch((err) => {
          console.log(err);
        })
    }
    axios
      .get("http://localhost:3001/funds")
        .then((resp) => { setFunds(resp.data); })
        .catch((err) => { console.log(err); });
    axios
      .get("http://localhost:3001/securities")
        .then((resp) => { setSecuritys(resp.data); })
        .catch((err) => { console.log(err); });
    }, []);
 console.log(values);
  
  const onChangeEvent = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]:value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const method = id ? "put" : "post";
    
    axios[method](`http://localhost:3001/securitys_transactions${id ? `/${id}` : ''}.json`, {security_transactions: values}) 
      .then((response) => {
        navigate("/transacaoAtivos") 
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
            <Form.Control requires name="desc_transaction" type="text" placeholder="Descrição"  value={values.desc_transaction} onChange={onChangeEvent} />
          </Form.Group>
        </Row>
        <Row>
            <Form.Group className="mb-3" controlId="formInputDesc">
            <Form.Label>Valor:</Form.Label>
            <Form.Control requires name="value_transaction" type="text" placeholder="Descrição" value={values.value_transaction}  onChange={onChangeEvent} />
          </Form.Group>
        </Row>
        <Row>
            <Form.Group className="mb-3" controlId="formInputDesc">
            <Form.Label>Quantidade:</Form.Label>
            <Form.Control requires name="quantity" type="text" placeholder="Quantidade"  value={values.quantity} onChange={onChangeEvent} />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formINputDate">
              <Form.Label>Data de efetuação:</Form.Label>
              <Form.Control required name="date_transaction" type="date" value={values.date_transaction} onChange={onChangeEvent} />
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
                <option>Selecione o fundo</option>
                {funds.map((e) => {
                    if (id) {
                        if (values.fund_id == e.id)
                          return (<option value={e.id} name="fund_id" selected>{e.name_fund}</option>)
                    }
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
                    if (id) {
                      if (e.id == values.security_id) 
                        return (<option value={e.id} selected name="security_id">{e.security_simbol}</option>) 
                    }
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
            {buttonText}
          </Button>
       </Row>
      </Form>
  </Container>
  );
}

export default TransactionSecurity;
