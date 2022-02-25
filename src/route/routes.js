import React from "react";
import { Route, Routes, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Fundos from '../Fundos.js'
import TransacaoCaixa from '../TransacaoCaixa.js'
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row'
import MyNavBar from "../view/MyNavBar.jsx"

const Rotas = () => {
  return (

  <BrowserRouter>
    <Container fluid="md">
      <Row>
        <MyNavBar/>
      </Row>
      <Row> 
          <Routes> 
            <Route element={<Fundos/>} path="/Fundos" /> 
            <Route element={<TransacaoCaixa/>} path="/transacaoCaixa" /> 
            <Route element={<Fundos/>} path="/transacoesAtivos" /> 
          </Routes>
      </Row>
    </Container>
  </BrowserRouter>
  )
}

export default Rotas; 
