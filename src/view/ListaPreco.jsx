import axios from 'axios';
import React, {useMemo} from "react";
import MaterialTable from 'material-table'
import Buttons from '../components/Buttons.jsx'
import CurrencyFormat from 'react-currency-format';
import { tableIcons } from '../header/icons.js'

const baseUrl = "http://localhost:3001/precos/historico"; 


function TransacaoCaixa() {
 const [data, setData] = React.useState([]);
 const columns = [  
              {title: "Ativo", field: "security.security_simbol",  align: "center"}, 
              {title: "Valor", field: "closing_price",  align: "center",  render: rowData => (<CurrencyFormat value={rowData.closing_price} displayType={'text'} thousandSeparator={true} prefix={'R$'} />)}, 
              {title: "Data: ",  align: "center",  field: "date_closing"},  
              {title: "Ações",  align: "center",  render: rowData => ( <Buttons id={rowData.id} nav="/Ativos/precos" sendTo="securitys_closing_prices"/> )}
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
      <MaterialTable icons={tableIcons}  data={data} columns={columns} title="Preços Cadastrados" />
  );
}

export default TransacaoCaixa;
