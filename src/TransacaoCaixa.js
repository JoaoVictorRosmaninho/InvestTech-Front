import axios from 'axios';
import React, {useMemo} from "react";
import Table from "./view/Table.jsx"

const baseUrl = "http://localhost:3001/transacaoCaixa"; 


function TransacaoCaixa() {
 const [data, setData] = React.useState([]);
 const columns = useMemo(
            () => [{Header: "InvestTech", columns: [ {Header: "Fundo", accessor: "name_fund"}, {Header: "Descrição: ", accessor: "desc_transaction"}, 
                  {Header: "Valor da Transação", accessor: "valor_transaction"}, {Header: "Data: ", accessor: "data_transection"}]}], []
  );
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
