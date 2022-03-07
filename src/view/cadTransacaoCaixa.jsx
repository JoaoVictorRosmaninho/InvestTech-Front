import React, { useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import AsyncSelect from 'react-select/async';

/* values to send to the api*/
const initialValue = {desc_transaction: "", value_transaction: "", date_transaction: "",  fund_id: ""};


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


const FundCreation = () => {
  const [values, setValues] = useState(initialValue);
  const navigate = useNavigate();
  const { id } = useParams();
  const buttonText = id ? "Atualizar" : "Cadastrar"; 

  React.useEffect(() => {
    if(id) {
      axios.get(`http://localhost:3001/cash_transactions/${id}.json`)
        .then((resp) => {
          setValues(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  
  const onChangeEvent = (e, name) => {
    if(name) {
      setValues({...values, [name]:e.value});
    } else {
      const {name, value} = e.target
      setValues({...values, [name]:value});
    }
  } 

  const onSubmit = (e) => {
    e.preventDefault();
    const method = id ? "put" : "post";
      
    axios[method](`http://localhost:3001/cash_transactions${id ? `/${id}` : ''}.json`, {cash_transaction: values}) 
      .then((response) => {
    navigate("/transacaoCaixa")
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
            <Form.Control requires name="desc_transaction"  type="text" placeholder="Descrição" value={values.desc_transaction}  onChange={onChangeEvent} />
          </Form.Group>
        </Row>
        <Row>
            <Form.Group className="mb-3" controlId="formInputDesc">
            <Form.Label>Valor:</Form.Label>
            <Form.Control requires name="value_transaction" type="text" placeholder="Valor" value={values.value_transaction} onChange={onChangeEvent} />
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
          <Button type="submit" onClick={onSubmit}>
            {buttonText}
          </Button>
       </Row>
      </Form>
  </Container>
  );
}

export default FundCreation;
