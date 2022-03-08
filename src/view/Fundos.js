import axios from 'axios';
import React from "react";
import MaterialTable from 'material-table'
import { useNavigate, Link } from 'react-router-dom'
import Buttons from '../components/Buttons.jsx'
import { tableIcons } from '../header/icons.js'

const baseUrl = "http://localhost:3001/fundos"; 

function Fundos() {
 const [data, setData] = React.useState([]);
 const navigate = useNavigate();
 const columns = 
              [ 
                {title: "Fundo", field: "name_fund", align: "center",
                render: rowData => (<Link to={`/Fundos/demonstrativo/${rowData.id}`}>{rowData.name_fund}</Link>)
                }, 
                {title: "Descricao", field: "desc_fund", align: "center"}, 
                {title: "Data de Cadastro", field: "creation_date", align: "center"}, 
                {title: "Ações", align: "center" ,  render: rowData => ( <Buttons id={rowData.id} nav="/Fundos" sendTo="funds"/> )}
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
    <MaterialTable icons={tableIcons}  data={data} columns={columns} title="Fundos" />
  );
}

export default Fundos;
