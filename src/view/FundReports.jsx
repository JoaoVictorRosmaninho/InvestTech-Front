import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import { useParams } from 'react-router-dom'
import axios from "axios";


const baseUrl = "http://localhost:3001/fundos"; 

const FundReports = () => {
  const [fundos, setFundos] = React.useState([]);
  const { id } = useParams() || null;
 

  /* React.useEffect(() => {
    axios
      .get(baseUrl)
        .then((resp) => { setFundos(resp.data); })
        .catch((err) => { console.log(err); });
  }, []);*/

    

    return (
      <Container className="mt-4" fluid="sm">
        <Row>
          <span>{id}</span>
        </Row>
      </Container>
    )
}

export default FundReports;
