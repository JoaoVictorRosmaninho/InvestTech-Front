import './App.css';
import axios from 'axios';
import React, {useMemo} from "react";
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row'
import MyNavBar from "./view/MyNavBar.jsx"
import Table from "./view/Table.jsx"

const baseUrl = "http://localhost:3001/fundos"; 


class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    React.useEffect(() => {
      axios
        .get(baseUrl)
          .then((resp) => {
            this.setState({data: resp.data})
          })
          .catch((err) => {
            console.log("Error: ", err);
        });
      }, []);

  render() {
    const columns = useMemo(() => [{Header: "InvestTech", columns: [ {Header: "Fundo", accessor: "name_fund"}, 
                            {Header: "Descricao", accessor: "desc_fund"}, {Header: "Data de Cadastro", accessor: "creation_date"}]}], []);  
  }

React.useEffect(() => {
  console.log(data);
})


}
return (
    <Container fluid="md">
      <Row>
        <MyNavBar/> 
      </Row>
      <Row>
        <Table columns={columns} data={data} /> 
      </Row>
    </Container>
  );
}

export default App;
