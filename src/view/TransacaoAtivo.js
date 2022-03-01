import axios from 'axios';
import React, {useMemo} from "react";
import Table from "../components/Table.jsx"
import { useNavigate } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format';

const baseUrl = "http://localhost:3001/transacaoAtivos"; 

  


function TransacaoAtivo() {
 const [data, setData] = React.useState([]);
 const navigate = useNavigate();
 const columns = useMemo(
            () => [{Header: "InvestTech", 
              columns: [ 
                {Header: "id", accessor: "id"}, 
                {Header: "Fundo", accessor: "name_fund"}, 
                {Header: "Descrição: ", accessor: "desc_transaction"}, 
                {Header: "Valor", accessor: "value_transaction"}, 
                {Header: "Quantidade", accessor: "quantity"}, 
                {Header: "Simbolo", accessor: "security_simbol"}, 
                {Header: "Data: ", accessor: "date_transaction"}, 
                {Header: "Total ", accessor: row => [row.value_transaction, row.quantity].reduce((mult, current) => {
                  let number = Number.parseFloat(mult) * Number.parseFloat(current); 
                  return number.toLocaleString();
                }, 1)},
                {Header: "Ações"}
              ]
            }], []);
  
  const Delete = (v) => {
   if (window.confirm("Tem certeza ?")) {
      console.log(v);
      axios.delete(`http://localhost:3001/securitys_transactions/${v}.json`)
      .then((resp) => {
      })
      .catch((err) => {
        console.log(err);
      })
  }
} 

  const Nav = (v) => {
    navigate(`/transacaoAtivos/edit/${v}`)
  }
 
  React.useEffect(() => {
    axios
      .get(baseUrl)
        .then((resp) => {
          setData(resp.data);
        })
        .catch((err) => {
          console.log("Error: ", err);
    });
  }, []);

  return (
      <Table columns={columns} data={data}  del={Delete}  nav={Nav} /> 
  );
}

export default TransacaoAtivo;
