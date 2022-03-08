import axios from 'axios';
import React, {useMemo} from "react";
import MaterialTable from 'material-table'
import { tableIcons } from '../header/icons.js'
import { useNavigate } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format';
import Buttons from '../components/Buttons.jsx'

const baseUrl = "http://localhost:3001/transacaoAtivos"; 

function TransacaoAtivo() {
 const [data, setData] = React.useState([]);
 const navigate = useNavigate();
 const columns = [ 
                {title: "Fundo", align: "center",  field: "fund.name_fund"}, 
                {title: "Descrição: ", align: "center", field: "desc_transaction"}, 
                {title: "Valor", align: "center",  field: "value_transaction",  render: rowData => (<CurrencyFormat value={rowData.value_transaction} displayType={'text'} thousandSeparator={true} prefix={'R$'} />)}, 
                {title: "Quantidade", align: "center",  field: "quantity", }, 
                {title: "Simbolo", align: "center",  field: "security.security_simbol"}, 
                {title: "Data: ", align: "center",  field: "date_transaction"}, 
                {title: "Total ", align: "center",  render: rowData => 
                  (
                    <CurrencyFormat value={Number(rowData.value_transaction) * Number(rowData.quantity)} displayType={'text'} thousandSeparator={true} prefix={'R$'} />
                  )},
                {title: "Ações",align: "center",   render: rowData => ( <Buttons margin={140} id={rowData.id} nav="/TransacaoAtivos" sendTo="securitys_transactions"/> )}
              ]
   
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
    <MaterialTable  icons={tableIcons}  data={data} columns={columns} title="Transações de Ativos" />
  );
}

export default TransacaoAtivo;
