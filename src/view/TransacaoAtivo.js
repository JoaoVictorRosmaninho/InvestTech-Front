import axios from 'axios';
import React, {useMemo} from "react";
import Table from "../components/Table.jsx"
import { useNavigate } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format';
import Buttons from '../components/Buttons.jsx'

const baseUrl = "http://localhost:3001/transacaoAtivos"; 

  


function TransacaoAtivo() {
 const [data, setData] = React.useState([]);
 const navigate = useNavigate();
 const columns = useMemo(
            () => [{Header: "InvestTech", 
              columns: [ 
                {Header: "N°", accessor: "id",  Cell: ({row}) => (Number(row.id) + 1)}, 
                {Header: "Fundo", accessor: "name_fund"}, 
                {Header: "Descrição: ", accessor: "desc_transaction"}, 
                {Header: "Valor", accessor: "value_transaction", Cell: ({row}) => (<CurrencyFormat value={row.values.value_transaction} displayType={'text'} thousandSeparator={true} prefix={'R$'} />)}, 
                {Header: "Quantidade", accessor: "quantity"}, 
                {Header: "Simbolo", accessor: "security_simbol"}, 
                {Header: "Data: ", accessor: "date_transaction"}, 
                {Header: "Total ", Cell: ({row})  => 
                  (
                    <CurrencyFormat value={Number(row.values.value_transaction) * Number(row.values.quantity)} displayType={'text'} thousandSeparator={true} prefix={'R$'} />
                  )},
                {Header: "Ações", Cell: ({row}) => ( <Buttons id={row.values.id} nav="/TransacaoAtivos" sendTo="securitys_transactions"/> )}
              ]
            }], []);
   
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
      <Table columns={columns} data={data} /> 
  );
}

export default TransacaoAtivo;
