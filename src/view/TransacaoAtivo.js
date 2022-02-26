import axios from 'axios';
import React, {useMemo} from "react";
import Table from "../components/Table.jsx"

const baseUrl = "http://localhost:3001/transacaoAtivos"; 


function TransacaoCaixa() {
 const [data, setData] = React.useState([]);
 const columns = useMemo(
            () => [{Header: "InvestTech", 
              columns: [ 
                {Header: "Fundo", accessor: "name_fund"}, 
                {Header: "Descrição: ", accessor: "desc_transaction"}, 
                {Header: "Valor da Transação", accessor: "value_transaction"}, 
                {Header: "Simbolo", accessor: "security_simbol"}, 
                {Header: "Data: ", accessor: "date_transaction"}, 
                {Header: "Ações"}
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
