import axios from 'axios';
import React from "react";
import MaterialTable from 'material-table'
import CurrencyFormat from 'react-currency-format';
import Buttons from '../components/Buttons.jsx'

const baseUrl = "http://localhost:3001/transacaoCaixa"; 


function TransacaoCaixa() {
 const [data, setData] = React.useState([]);
 const columns = [
              {title: "Fundo", field: "fund.name_fund"}, 
              {title: "Descrição: ", field: "desc_transaction"},  
              {title: "Valor da Transação", field: "value_transaction", render: rowData => (<CurrencyFormat value={rowData.value_transaction} displayType={'text'} thousandSeparator={true} prefix={'R$'} />)}, 
              {title: "Data: ", field: "date_transaction"},  
              {title: "Ações", align: "center" , render: rowData => ( <Buttons id={rowData.id} nav="/transacaoCaixa" sendTo="transacaoCaixa"/> )}
            ];
   
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
    <MaterialTable  data={data} columns={columns} title="Transações de Caixa" />
  );
}

export default TransacaoCaixa;
