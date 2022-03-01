import axios from 'axios';
import React, {useMemo} from "react";
import Table from "../components//Table.jsx"
import Buttons from '../components/Buttons.jsx'
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom'

const baseUrl = "http://localhost:3001/precos/historico"; 


function TransacaoCaixa() {
 const [data, setData] = React.useState([]);
 const navigate = useNavigate();
 const columns = useMemo(
            () => [{Header: "InvestTech", 
            columns: [ 
              {Header: "id", accessor: "id"}, 
              {Header: "Ativo", accessor: "security_simbol"}, 
              {Header: "Valor", accessor: "closing_price", Cell: ({row}) => (<CurrencyFormat value={row.values.closing_price} displayType={'text'} thousandSeparator={true} prefix={'R$'} />)}, 
              {Header: "Data: ", accessor: "date_closing"},  
              {Header: "Ações", Cell: ({row}) => ( <Buttons id={row.values.id} nav="/Ativos/precos/edit" sendTo="securitys_closing_prices"/> )}
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

export default TransacaoCaixa;
