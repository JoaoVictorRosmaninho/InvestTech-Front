import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Table from "../components/Table.jsx"
import { useParams } from 'react-router-dom'
import { Chart } from "react-google-charts"
import CurrencyFormat from 'react-currency-format';
import axios from "axios";


const options = {
  title: "Composicao da Carteira",
};


const FundReports = () => {
  const [security, setSecurity] = React.useState([]);
  const [fund, setFund] = React.useState([]);
  const [date, setDate] = React.useState("");
  const [yesterday, setYesterday] = React.useState([]);
  const [dtoday, setToday] = React.useState([]);
  const [tomorrow, setTomorrow] = React.useState([]);
  const [pl, setPl] = React.useState([]);
  const [bool, setBool] = React.useState(false);
  const { id } = useParams() || null;
  const data = [["Ativos", "quantidade"]];
  
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
      axios.get(`http://localhost:3001/funds/${id}.json`) 
      .then((resp) => {
        setFund(resp.data);
      })
        .catch((err) => {
        console.log("Error: ", err); 
     });    
  }, []);


  const onChangeEvent = (e) => {
    const {name, value} = e.target
    setDate({...date, [name]:value});
  }

  const onClick = (e) => {
    setBool(true);
    const today = new Date(date.creation_date);
    let auxDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ (today.getDate() + 1);

     axios
        .get(`http://localhost:3001/portifolios/ativos/${id}/${auxDate}`)
          .then((resp) => { setSecurity(resp.data); })
          .catch((err) => { console.log(err); });   
   
    auxDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ (today.getDate());  
    axios
      .get(`http://localhost:3001//portifolios/saldo/${id}/${auxDate}`)
       .then((resp) => { setYesterday(resp.data); })
        .catch((err) => { console.log(err); });
  
    
    auxDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ (today.getDate() + 1);
    axios
      .get(`http://localhost:3001/portifolios/pl/${id}/${today}`)
        .then((resp) => { setPl(resp.data); })
        .catch((err) => { console.log(err); }); 

   
    axios
      .get(`http://localhost:3001//portifolios/saldo/${id}/${auxDate}`)
        .then((resp) => { setToday(resp.data); })
        .catch((err) => { console.log(err); }); 
    
   
    auxDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ (today.getDate() + 2);
    axios
      .get(`http://localhost:3001//portifolios/saldo/${id}/${auxDate}`)
        .then((resp) => { setTomorrow(resp.data); })
        .catch((err) => { console.log(err); }); 
  }

    security.map((e) => {
      data.push([e.security.security_simbol, e.security_quantity]);
    })
    console.log(security)

    return (
      <>
      <Container className="mt-4" fluid="sm">
          <Row>
            <Col><h2>{fund.name_fund}</h2></Col>
          </Row>
          <Row>
            
          </Row>
          <Row className="mt-4">
            <Col>
              <Form.Group className="mb-3" controlId="formINputDate">
              
                <Form.Control required name="creation_date" type="date"  onChange={onChangeEvent} />
              </Form.Group>
            </Col>
            <Col>          
              <Button type="submit" onClick={onClick}>
                Atualizar
            </Button>
            </Col>
            <Col></Col>
          </Row> 
        </Container>  
        {bool && 
        <Container>
          <Row className="mt-4">
            <Col>
              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </Col>
          </Row>
          <Row className="mt-2"> 
            <Col> PL: <strong><CurrencyFormat value={pl.pl} displayType={'text'} thousandSeparator={true} prefix={'R$ '}/></strong></Col>
            <Col>D-1: {yesterday.map((e) => (<strong><CurrencyFormat value={e.balance} displayType={'text'} thousandSeparator={true} prefix={'R$ '}/></strong>))}</Col>
            <Col>D0: {dtoday.map((e) => (<strong><CurrencyFormat value={e.balance} displayType={'text'} thousandSeparator={true} prefix={'R$ '}/></strong>))} </Col>
            <Col>D1: {tomorrow.map((e) => (<strong><CurrencyFormat value={e.balance} displayType={'text'} thousandSeparator={true} prefix={'R$ '}/></strong>))}</Col>
          </Row>
          <Row>
            <Table columns={columns} data={security} /> 
          </Row>
      </Container>}
      </>
    )
}

export default FundReports;
