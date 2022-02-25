import axios from 'axios';
import React, {useMemo} from "react";
import Table from "./view/Table.jsx"

const baseUrl = "http://localhost:3001/fundos"; 


function Fundos() {
 const [data, setData] = React.useState([]);
 const columns = useMemo(
            () => [{Header: "InvestTech", columns: [ {Header: "Fundo", accessor: "name_fund"}, 
                  {Header: "Descricao", accessor: "desc_fund"}, {Header: "Data de Cadastro", accessor: "creation_date"}]}], []
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

export default Fundos;
