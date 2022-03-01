import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import axios from "axios";


const baseUrl = "http://localhost:3001/fundos"; 

const FundReports = () => {
  const [fundos, setFundos] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(baseUrl)
        .then((resp) => { setFundos(resp.data); })
        .catch((err) => { console.log(err); });
  }, []);

  console.log(fundos);

    return (
      <Container className="mt-4" fluid="sm">
        <Row>
          <Col Style="align-text:center;">Escolha o Fundo: </Col>
          <Col>
             <Form.Group className="mb-3">
              <Form.Select id="disabledSelect" name="fund_id"> //tirei o onChangeEvent 
                <option>Selecione o fundo</option>
                {
                  fundos.map((e) => (<option value={e.id} name="fund_id">{e.name_fund}</option>))
                }
              </Form.Select>
            </Form.Group>
          </Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    )
}

export default FundReports;
