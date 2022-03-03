import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from "../components/Table.jsx"
import { useParams } from 'react-router-dom'
import axios from "axios";

const FundReports = () => {
  const [security, setSecurity] = React.useState([]);
  const { id } = useParams() || null;
  const columns = React.useMemo(
      () => 
      [
        {Header: "Ativos", columns: 
        [ 
          {Header: "N°", accessor: "id",  Cell: ({row}) => (Number(row.id) + 1)}, 
          {Header: "Ativo", accessor: "security.security_simbol"}, 
          {Header: "Quantidade", accessor: "security_quantity"}, 
        ]}

      ], []
  );

   React.useEffect(() => {
    axios
      .get(`http://localhost:3001/portifolios/ativos/${id}`)
        .then((resp) => { setSecurity(resp.data); })
        .catch((err) => { console.log(err); });
  }, []);

      
    return (
      <Container className="mt-4" fluid="sm">
        <Row>
          <Col>PL: </Col>
          <Col>Saldo em Caixa: </Col>
          <Col>D-0: </Col>
          <Col>D-1: </Col>
        </Row>
        <Row className="mt-4">
          <Col>Grafico</Col>
        </Row>
        <Row>
          <Table columns={columns} data={security} /> 
        </Row>
      </Container>
    )
}

export default FundReports;
