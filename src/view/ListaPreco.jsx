import axios from 'axios';
import React, {useMemo} from "react";
import Table from "../components//Table.jsx"
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
              {Header: "Valor", accessor: "closing_price"}, 
              {Header: "Data: ", accessor: "date_closing"},  
              {Header: "Ações"}]
            }], []);
   
  const Delete = (v) => {
   if (window.confirm("Tem certeza ?")) {
    axios.delete(`http://localhost:3001/securitys_closing_prices/${v}.json`)
      .then(() => {
        navigate("/Ativos/precos/historico")
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

  const Nav = (v) => {
    navigate(`/Ativos/precos/edit/${v}`)
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
