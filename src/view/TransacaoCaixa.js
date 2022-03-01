import axios from 'axios';
import React, {useMemo} from "react";
import Table from "../components//Table.jsx"
import { useNavigate } from 'react-router-dom'

const baseUrl = "http://localhost:3001/transacaoCaixa"; 


function TransacaoCaixa() {
 const [data, setData] = React.useState([]);
 const navigate = useNavigate();
 const columns = useMemo(
            () => [{Header: "InvestTech", 
            columns: [ 
              {Header: "id", accessor: "id"}, 
              {Header: "Fundo", accessor: "name_fund"}, 
              {Header: "Descrição: ", accessor: "desc_transaction"},  
              {Header: "Valor da Transação", accessor: "valor_transaction"}, 
              {Header: "Data: ", accessor: "data_transection"},  
              {Header: "Ações"}]
            }], []);
   
  const Delete = (v) => {
   if (window.confirm("Tem certeza ?")) {
    axios.delete(`http://localhost:3001/transacaoCaixa/${v}.json`)
      .then(() => {
        navigate("/transacaoCaixa")
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

  const Nav = (v) => {
    navigate(`/transacaoCaixa/edit/${v}`)
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
      <Table columns={columns} data={data} del={Delete} nav={Nav}/> 
  );
}

export default TransacaoCaixa;
