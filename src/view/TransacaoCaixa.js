import axios from 'axios';
import React, {useMemo} from "react";
import Table from "../components//Table.jsx"
import CurrencyFormat from 'react-currency-format';
import Buttons from '../components/Buttons.jsx'

const baseUrl = "http://localhost:3001/transacaoCaixa"; 


function TransacaoCaixa() {
 const [data, setData] = React.useState([]);
 const columns = useMemo(
            () => [{Header: "InvestTech", 
            columns: [ 
              {Header: "N°", accessor: "id",  Cell: ({row}) => (Number(row.id) + 1)}, 
              {Header: "Fundo", accessor: "fund.name_fund"}, 
              {Header: "Descrição: ", accessor: "desc_transaction"},  
              {Header: "Valor da Transação", accessor: "value_transaction", Cell:  ({row}) => (<CurrencyFormat value={row.values.value_transaction} displayType={'text'} thousandSeparator={true} prefix={'R$'} />)}, 
              {Header: "Data: ", accessor: "date_transaction"},  
              {Header: "Ações", Cell: ({row}) => ( <Buttons id={row.values.id} nav="/transacaoCaixa" sendTo="transacaoCaixa"/> )}
            ]
          }
        ], []);
   
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
      <Table columns={columns} data={data}/> 
  );
}

export default TransacaoCaixa;
