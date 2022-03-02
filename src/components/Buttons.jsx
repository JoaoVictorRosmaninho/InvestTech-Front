
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Buttons = (props) => {
    const navigate = useNavigate();
    
    const Del = (v) => {
        if (window.confirm("Tem certeza ?")) {
        axios.delete(`http://localhost:3001/${props.sendTo}/${v}.json`)
          .then(() => {
            navigate(props.nav)
          })
          .catch((err) => {
            alert("Não se pode apagar esse registro.");
          })
      }
    }

  const Nav = (v) => {
    navigate(`${props.nav}/edit/${v}`)
  }

  return (
    <Container fluid="sm">
    <Row className="justify-content-sm-center">
      <Col sm={4}><Button variant="primary" value={props.id} onClick={(e) => Nav(e.target.value)}>Editar</Button></Col>
      <Col sm={4}><Button variant="danger" className="ml-3" value={props.id} onClick={(e) => {Del(e.target.value)}}>Apagar</Button></Col>
    </Row>
    </Container>
  )
}

export default Buttons;
