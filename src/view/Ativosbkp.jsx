import axios from 'axios';
import React, {useMemo} from "react";
import Table from "../components/Table.jsx"
import Buttons from '../components/Buttons.jsx'
import { useNavigate } from 'react-router-dom'

const baseUrl = "http://localhost:3001/ativos"; 


function Fundos() {
 const [data, setData] = React.useState([]);
 const navigate = useNavigate();
 const columns = useMemo(
            () => [{Header: "InvestTech",
              columns: [ 
                {Header: "N°", accessor: "id",  Cell: ({row}) => (Number(row.id) + 1)}, 
                {Header: "Ativo", accessor: "security_simbol"}, 
                {Header: "Descricao", accessor: "security_desc"}, 
                {Header: "Data de Cadastro", accessor: "creation_date"}, 
                {Header: "Ações", Cell: ({row}) => ( <Buttons id={row.values.id} nav="/Ativos" sendTo="securities"/> )}
              ]}], []);

 /* const Delete = (v) => {
   if (window.confirm("Tem certeza ?")) {
   axios.delete(`http://localhost:3001/securities/${v}.json`)
      .then(() => {
      })
      .catch((err) => {
        alert("Ativo presente em mais de um fundo, não pode ser apagado");
      })
  } 
} 

  const Nav = (v) => {
    navigate(`/Ativos/edit/${v}`)
  }
*/
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

export default Fundos;
