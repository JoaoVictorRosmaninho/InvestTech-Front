import React, { useState, useEffect, Component } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Select from 'react-select';

/* values to send to the api*/
const initialValue = {desc_transaction: "", value_transaction: "", date_transaction: "",  fund_id: "", security_id: "", quantity: ""};

const today = new Date();

const TransactionSecurity = () => {
  const [values, setValues] = useState(initialValue);
  const [funds, setFunds] = useState([]);
  const [security, setSecuritys] = useState([]);
  const [price, setPrice] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams() || null;
  const buttonText = id ? "Atualizar" : "Cadastrar"; 
  let t;

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
let aux;

  const onChangeEvent = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]:value});
  } 
  
  const loadSecurityValue = () => {
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ (today.getDate() - 1);
    axios
      .get(`http://localhost:3001/precoAtivos/${values.security_id}`)
        .then((resp) => {
          setPrice(resp.data);
        }) 
        .catch((err) => { console.log(err); });
    let aux = price[0];
   /* const newValues = { 
      desc_transaction: values.desc_transaction, 
      value_transaction: aux.closing_price, 
      date_transaction: values.date_transaction,  
      fund_id: values.fund_id, 
      security_id: values.security_id, 
      quantity: values.quantity
    }; */

    setValues(values, {value_transaction: aux.closing_price});  
   
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    const method = id ? "put" : "post";
    if (!id) {
      const cash_values = {
        desc_transaction: values.desc_transaction, 
        value_transaction: (Number(values.value_transaction) * Number(values.quantity) * -1), 
        date_transaction: values.date_transaction, 
        fund_id: values.fund_id
      }
      axios.post(`http://localhost:3001/cash_transactions.json`, {cash_transaction: cash_values}) 
        .then()
        .catch((err) => {
          console.log(err);
        });
    }
    loadSecurityValue();     
    /*axios[method](`http://localhost:3001/securitys_transactions${id ? `/${id}` : ''}.json`, {security_transactions: values}) 
      .then((response) => {
        navigate("/transacaoAtivos") 
      })
      .catch((err) => {
        console.log(err);
      });*/
  }
  console.log(values);
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
