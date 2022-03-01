import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from "axios";

/* values to send to the api*/
const initialValue = {closing_price: "", date_closing: "", security_id: ""};

/* Link do request the api*/
const baseUrl = "http://localhost:3001/securities"; 

const CadPrecoAtivo = () => {
  const [values, setValues] = useState(initialValue);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const buttonText = id ? "Atualizar" : "Cadastrar"; 

  useEffect(() => {
    if(id) {
      axios.get(`http://localhost:3001/securitys_closing_prices/${id}.json`)
        .then((resp) => {
          setValues(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    axios
      .get(baseUrl)
        .then((resp) => { setData(resp.data); })
        .catch((err) => { console.log(err); });
  }, []);

  console.log(data);
  
  const onChangeEvent = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]:value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const method = id ? "put" : "post";
    axios[method](`http://localhost:3001/securitys_closing_prices${id ? `/${id}` : ''}.json`, {securitys_closing_price: values}) 
      .then((response) => {
    navigate("/Ativos/precos/historico")
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
            <Form.Label>Valor de Fechamento:</Form.Label>
            <Form.Control requires name="closing_price"  type="text" placeholder="Preço" value={values.closing_price}  onChange={onChangeEvent} />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formINputDate">
              <Form.Label>Data de Fechamento:</Form.Label>
              <Form.Control required name="date_closing" type="date" value={values.date_closing} onChange={onChangeEvent} />
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
                <option>Selecione um Ativo</option>
                {data.map((e) => {
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

export default CadPrecoAtivo;
