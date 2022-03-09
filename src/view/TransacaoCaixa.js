import axios from 'axios';
import React from "react";
import MaterialTable from 'material-table'
import CurrencyFormat from 'react-currency-format';
import Buttons from '../components/Buttons.jsx'
import { tableIcons } from '../header/icons.js'

const baseUrl = "http://localhost:3001/transacaoCaixa"; 


function TransacaoCaixa() {
 const [data, setData] = React.useState([]);
 const columns = [
              {title: "Fundo", field: "fund.name_fund", align: "center"}, 
              {title: "Descrição: ", field: "desc_transaction", align: "center"},  
              {title: "Valor da Transação", field: "value_transaction", align: "center",  render: rowData => (<CurrencyFormat value={Number(rowData.value_transaction).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'R$'} />)}, 
              {title: "Data: ", field: "date_transaction", align: "center"},  
              {title: "Ações", align: "center", align: "center" , render: rowData => ( <Buttons id={rowData.id} nav="/transacaoCaixa" sendTo="cash_transactions"/> )}
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
    <MaterialTable  icons={tableIcons}  data={data} columns={columns} title="Transações de Caixa" />
  );
}

export default TransacaoCaixa;
