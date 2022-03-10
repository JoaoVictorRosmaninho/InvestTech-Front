import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import MaterialTable from 'material-table'
import { tableIcons } from '../header/icons.js'
import { useParams } from 'react-router-dom'
import { Chart } from "react-google-charts"
import CurrencyFormat from 'react-currency-format';
import axios from "axios";
import AsyncSelect from 'react-select/async';


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


const options = {
  title: "Composicao da Carteira",
};

const columnsSecurity = 
[ 
  {title: "Ativo", align: "center", field: "security.security_simbol"}, 
  {title: "Quantidade", align: "center", field: "security_quantity"}, 
  {title: "Preço de compra", align: "center", field: "securitys_closing_prices.closing_price",
  render: rowData => (<CurrencyFormat value={rowData.securitys_closing_prices.closing_price} displayType={'text'} thousandSeparator={true} prefix={'R$'} />)} 
];

const columnsTransactions = 
[ 
  {title: "Descrição", align: "center",field: "desc_transaction"}, 
  {title: "Valor", align: "center",field: "value_transaction", 
  render: rowData => (<CurrencyFormat value={Number(rowData.value_transaction).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'R$'} />)}, 
  {title: "Data", align: "center", field: "date_transaction"}
];


const FundReports = () => {
  const [security, setSecurity] = React.useState([]);
  const [transactions, setTransactions] = React.useState([])
  const [fund, setFund] = React.useState([]);
  const [date, setDate] = React.useState("");
  const [yesterday, setYesterday] = React.useState([]);
  const [dtoday, setToday] = React.useState([]);
  const [tomorrow, setTomorrow] = React.useState([]);
  const [pl, setPl] = React.useState([]);
  const [bool, setBool] = React.useState(false);
  const { id } = useParams() || null;
  const data = [["Ativos", "quantidade", "preçoVenda"]];
  

/*   React.useEffect(() => {
      axios.get(`http://localhost:3001/funds/${id}.json`) 
      .then((resp) => {
        setFund(resp.data);
      })
        .catch((err) => {
        console.log("Error: ", err); 
     });    
  }, []);*/

  const onChangeEvent = (e, name) => {
    if(name) {
      setFund({...fund, [name]:e.value});
    } else {
      const {name, value} = e.target
      setDate({...date, [name]:value});
    }
  } 



  const onClick = (e) => {
    setBool(true);
    const today = new Date(date.creation_date);
    let auxDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ (today.getDate() + 1);

    axios.get(`http://localhost:3001/funds/${fund.fund_id}.json`) 
      .then((resp) => {
        setFund(resp.data);
      })
        .catch((err) => {
        console.log("Error: ", err); 
     });    

    axios
      .get(`http://localhost:3001/portifolios/transacoes/${fund.fund_id}/${auxDate}`)
        .then((resp) => { setTransactions(resp.data)})
        .catch((err) => { console.log(err)}); 
    
    axios
        .get(`http://localhost:3001/portifolios/ativos/${fund.fund_id}/${auxDate}`)
          .then((resp) => { setSecurity(resp.data); })
          .catch((err) => { console.log(err); }); 
    
    axios
        .get(`http://localhost:3001/portifolios/pl/${fund.fund_id}/${auxDate}`)
          .then((resp) => { setPl(resp.data); })
          .catch((err) => { console.log(err); }); 
    
    axios
        .get(`http://localhost:3001//portifolios/saldo/${fund.fund_id}/${auxDate}`)
          .then((resp) => { setToday(resp.data); })
          .catch((err) => { console.log(err); }); 
   
    auxDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ (today.getDate());  
    axios
      .get(`http://localhost:3001//portifolios/saldo/${fund.fund_id}/${auxDate}`)
       .then((resp) => { setYesterday(resp.data); })
        .catch((err) => { console.log(err); });   
   
    auxDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ (today.getDate() + 2);
    axios
      .get(`http://localhost:3001//portifolios/saldo/${fund.fund_id}/${auxDate}`)
        .then((resp) => { setTomorrow(resp.data); })
        .catch((err) => { console.log(err); }); 
  }

    security.map((e) => {
      data.push([e.security.security_simbol, e.security_quantity, e.securitys_closing_prices.closing_price]);
    })
    console.log(security);
    return (
      <>
      <Container className="mt-4" fluid="sm">
          <Row>
            <Col xs={5}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">Selecione o Fundo</Form.Label>
                <AsyncSelect 
                  cacheOptions 
                  defaultOptions 
                  onChange={(e) => onChangeEvent(e, "fund_id")} 
                  loadOptions={() => loadOptions("http://localhost:3001/funds", "name_fund")}/>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col xs={5}>
              <Form.Group className="mb-3" controlId="formINputDate">
                <Form.Label htmlFor="disabledSelect">Até:</Form.Label>
                <Form.Control required name="creation_date" type="date"  onChange={onChangeEvent} />
              </Form.Group>
            </Col>        
          </Row>
          <Row>
            <Col xs={5}>
              <Button type="submit" onClick={onClick}>
                  Atualizar
              </Button>
            </Col>
          </Row> 
        </Container>  
        {bool && 
        <Container className="mt-4">
          <Row>
            <Col><h2>{fund.name_fund}</h2></Col>
          </Row>
          <Row className="mt-03">
            <Col>
                <Button type="submit" variant="warning" onClick={onClick}>
                    Exportar para a BlockChain
                </Button>
            </Col> 
          </Row>
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
          <Row className="mt-4">
            <MaterialTable 
              icons={tableIcons}  
              data={security} 
              columns={columnsSecurity} 
              title="Carteira" 
            />
          </Row>
          <Row className="mt-4">
            <MaterialTable 
              icons={tableIcons}  
              data={transactions} 
              columns={columnsTransactions} 
              title="Movimentações de Caixa" 
            />
          </Row>
      </Container>}
      </>
    )
}

export default FundReports;
