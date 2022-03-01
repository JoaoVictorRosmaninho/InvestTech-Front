import axios from 'axios';
import React, {useMemo} from "react";
import Table from "../components/Table.jsx"
import { useNavigate } from 'react-router-dom'

const baseUrl = "http://localhost:3001/fundos"; 


function Fundos() {
 const [data, setData] = React.useState([]);
 const navigate = useNavigate();
 const columns = useMemo(
            () => [{Header: "InvestTech",
              columns: [ 
                {Header: "id", accessor: "id"}, 
                {Header: "Fundo", accessor: "name_fund"}, 
                {Header: "Descricao", accessor: "desc_fund"}, 
                {Header: "Data de Cadastro", accessor: "creation_date"}, 
                {Header: "Ações"}]}], []
  );

  const Delete = (v) => {
   if (window.confirm("Tem certeza ?")) {
   axios.delete(`http://localhost:3001/funds/${v}.json`)
      .then(() => {
        navigate("/Fundos")
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

  const Nav = (v) => {
    navigate(`/Fundos/edit/${v}`)
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
      <Table columns={columns} data={data} del={Delete} nav={Nav} /> 
  );
}

export default Fundos;
