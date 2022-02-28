import axios from 'axios';
import React, {useMemo} from "react";
import Table from "../components/Table.jsx"

const baseUrl = "http://localhost:3001/ativos"; 


function Fundos() {
 const [data, setData] = React.useState([]);
 const columns = useMemo(
            () => [{Header: "InvestTech",
              columns: [ 
                {Header: "Ativo", accessor: "security_simbol"}, 
                {Header: "Descricao", accessor: "security_desc"}, 
                {Header: "Data de Cadastro", accessor: "creation_date"}, 
                {Header: "Ações"}]}], []);

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
