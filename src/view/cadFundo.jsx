import React from 'react'; 
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function FundCreation() {
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [date, setDate] = React.useState("");


  return (
  <Container fluid="sm" className="mt-4">
      <Form>
        <Row>
          <Form.Group className="mb-3" controlId="formInputNameFund">
            <Form.Label>Nome do Fundo</Form.Label>
          <Form.Control type="text" placeholder="Entre com o Nome do Fundo" />
          </Form.Group>
            <Form.Group className="mb-3" controlId="formInputDesc">
            <Form.Label>Descrição sobre o fundo:</Form.Label>
            <Form.Control type="text" placeholder="Descrição" />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formINputDate">
              <Form.Label>Data de criação:</Form.Label>
              <Form.Control type="date" label="Check me out" />
            </Form.Group>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row> 
        <Row>
          <Button>
            Cadastrar
          </Button>
       </Row>
      </Form>
  </Container>
  );
}

export default FundCreation;
