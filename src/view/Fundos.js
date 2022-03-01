import axios from 'axios';
import React, {useMemo} from "react";
import Table from "../components/Table.jsx"
import { useNavigate, Link } from 'react-router-dom'
import Buttons from '../components/Buttons.jsx'

const baseUrl = "http://localhost:3001/fundos"; 

function Fundos() {
 const [data, setData] = React.useState([]);
 const navigate = useNavigate();
 const columns = useMemo(
            () => 
   [
     {
       Header: "InvestTech",
              columns: 
              [ 
                {Header: "id", accessor: "id"}, 
                {Header: "Fundo", accessor: "name_fund", 
                 Cell: ({row}) => (<Link to={`/Relatorios/fundos/${row.values.id}`}>{row.values.name_fund}</Link>)
                }, 
                {Header: "Descricao", accessor: "desc_fund"}, 
                {Header: "Data de Cadastro", accessor: "creation_date"}, 
                {Header: "Ações", Cell: ({row}) => ( <Buttons id={row.values.id} nav="/Fundos/edit" sendTo="funds"/> )}
              ]
     }
   ], []);


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
