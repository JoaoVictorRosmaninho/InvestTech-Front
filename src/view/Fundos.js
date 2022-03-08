import axios from 'axios';
import React from "react";
import MaterialTable from 'material-table'
import { useNavigate, Link } from 'react-router-dom'
import Buttons from '../components/Buttons.jsx'

const baseUrl = "http://localhost:3001/fundos"; 

function Fundos() {
 const [data, setData] = React.useState([]);
 const navigate = useNavigate();
 const columns = 
              [ 
                {title: "Fundo", field: "name_fund", 
                render: rowData => (<Link to={`/Fundos/demonstrativo/${rowData.id}`}>{rowData.name_fund}</Link>)
                }, 
                {title: "Descricao", field: "desc_fund"}, 
                {title: "Data de Cadastro", field: "creation_date"}, 
                {title: "Ações", render: rowData => ( <Buttons id={rowData.id} nav="/Fundos" sendTo="funds"/> )}
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
    <MaterialTable  data={data} columns={columns} title="Transações de Caixa" />
  );
}

export default Fundos;
