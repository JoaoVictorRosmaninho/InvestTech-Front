import React, { useState, useEffect, Component } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import AsyncSelect from 'react-select/async';



/* values to send to the api*/
const initialValue = {desc_transaction: "", value_transaction: "", date_transaction: "",  fund_id: "", security_id: "", quantity: ""};


const loadOptions = (Url, name) => {
  return axios
    .get(Url)
      .then((resp) => {
          const options = [];
          const data = Array.from(resp.data);
          data.map((element) => {
            options.push({label: element[name], value: element.id})
          }) 
          return options;       
      })      
}

const loadPrice = (value) => {
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ (today.getDate() - 1);
  return axios 
    .get(`http://localhost:3001/precoAtivos/${value}/${date}`)
      .then((resp) => {
          const data = Array.from(resp.data);
          return data;
      })
      .catch((err) => {
        console.log(err);
      })
}

const TransactionSecurity = () => {
  const [values, setValues] = useState(initialValue);
  const [funds, setFunds] = useState([]);
  const [security, setSecuritys] = useState([]);
  const [price, setPrice] = useState([]);
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
    }, []);

  const onChangeEvent = (e, name) => {
    if(name) {
      if (name == "security_id") {
        const aux = loadPrice(e.value);
        aux.then((resp) => {
          const valuePrice = resp[0];
          setValues({...values, value_transaction:valuePrice.closing_price, [name]:e.value});
        })
        .catch((err) => {
          window.alert("Valor com ultimo preço ainda  nao cadastrado")
        });
      }
      else
        setValues({...values, [name]:e.value});
    } else {
      const {name, value} = e.target
      setValues({...values, [name]:value});
    }
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
    axios[method](`http://localhost:3001/securitys_transactions${id ? `/${id}` : ''}.json`, {security_transactions: values}) 
      .then((response) => {
        navigate("/transacaoAtivos") 
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log(values)
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
          <Form.Group className="mb-3" controlId="formINputDate">
              <Form.Label>Selecione um Fundo</Form.Label>
              <AsyncSelect 
                cacheOptions 
                defaultOptions 
                onChange={(e) => onChangeEvent(e, "fund_id")} 
                loadOptions={() => loadOptions("http://localhost:3001/funds", "name_fund")}/>
          </Form.Group>
          </Col>
          <Col></Col>
          <Col></Col>
         </Row>
        <Row>
          <Col>
          {values.fund_id &&  <Form.Group className="mb-3" controlId="formINputDate">
              <Form.Label>Selecione um Ativo</Form.Label>
                <AsyncSelect 
                  cacheOptions 
                  defaultOptions 
                  onChange={(e) => onChangeEvent(e, "security_id")} 
                  loadOptions={() => loadOptions("http://localhost:3001/securities", "security_simbol")} 
                />
          </Form.Group>}
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
/*
      


*/