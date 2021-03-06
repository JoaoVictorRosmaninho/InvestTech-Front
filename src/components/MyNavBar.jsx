import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';

function MyNavBar() {
  return (
  <Row>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand >InvestTech</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <NavDropdown title="Fundos" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Fundos/new">Cadastrar Fundos</NavDropdown.Item>
              <NavDropdown.Item href="/Fundos">Listar Fundos</NavDropdown.Item>
              <NavDropdown.Item href="/Fundos/demonstrativos">Portfólios</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Transações Caixa" id="basic-nav-dropdown">
              <NavDropdown.Item href="/transacaoCaixa/new">
                    Nova Transação
              </NavDropdown.Item>
              <NavDropdown.Item href="/transacaoCaixa" > 
                    Listar Transações
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Transacões de Ativos" id="basic-nav-dropdown">
              <NavDropdown.Item href="/TransacaoAtivos/new">Compra e venda de Ativos</NavDropdown.Item>
              <NavDropdown.Item href="/TransacaoAtivos">Listar Transações</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Ativos" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Ativos/new">Novo Ativo</NavDropdown.Item>
              <NavDropdown.Item href="/Ativos">Listar Ativos</NavDropdown.Item>
              <NavDropdown.Item href="/Ativos/precos/new">Cadastrar Preços</NavDropdown.Item>
              <NavDropdown.Item href="/Ativos/precos">Histórico de preços</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Blockchain" id="basic-nav-dropdown">
              <NavDropdown.Item href="https://rinkeby.etherscan.io/address/0xe07c6f83879b6c05082b092e1dcc9ea5f50e63c2">Listar Transações</NavDropdown.Item>
              <NavDropdown.Item href="https://rinkeby.etherscan.io/address/0xe07c6f83879b6c05082b092e1dcc9ea5f50e63c2#readContract">Consultar Transação</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    </Navbar.Collapse>
</Navbar>
  </Row>
  );
}

export default MyNavBar;
