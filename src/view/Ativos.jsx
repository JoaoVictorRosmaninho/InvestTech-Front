import axios from 'axios';
import React, {useMemo} from "react";
import MaterialTable from 'material-table'
import Buttons from '../components/Buttons.jsx'
import { tableIcons } from '../header/icons.js'

const baseUrl = "http://localhost:3001/ativos"; 


function Fundos() {
 const [data, setData] = React.useState([]);
 let count = 0;
 const columns =  [ 
                {title: "Ativo", align: "center",  field: "security_simbol"}, 
                {title: "Data de Cadastro", align: "center",  field: "creation_date"}, 
                {title: "Descricao",  align: "center", field: "security_desc"}, 
                {title: "Ações", align: "center" , render: rowData => (<Buttons id={rowData.id} nav="/Ativos" sendTo="securities"/>)}
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
      <MaterialTable icons={tableIcons}  data={data} columns={columns} title="Ativos Cadastrados" />
  );
}

export default Fundos;
