import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

function MyNavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand >InvestTech</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <NavDropdown title="Fundos" id="basic-nav-dropdown">
              <NavDropdown.Item>Cadastrar Fundos</NavDropdown.Item>
              <NavDropdown.Item href="/Fundos">
                  Listar Fundos
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Transações Caixa" id="basic-nav-dropdown">
              <NavDropdown.Item >Nova Transação</NavDropdown.Item>
              <NavDropdown.Item href="/transacaoCaixa" > 
                    Listar Transações
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Transacões de Ativos" id="basic-nav-dropdown">
              <NavDropdown.Item >Nova Transação</NavDropdown.Item>
              <NavDropdown.Item href="/TransacaoAtivos">Listar Transações</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    </Navbar.Collapse>
</Navbar>
  );
}

export default MyNavBar;
