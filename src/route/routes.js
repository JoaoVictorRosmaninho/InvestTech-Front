import React from "react";
import { Route, Routes, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Fundos from '../Fundos.js'
import TransacoesCaixa from '../TransacaoCaixa.js'
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
            <Route element={<TransacoesCaixa/>} path="/Transacoescaixa" /> 
            <Route element={<Fundos/>} path="/TransacoesAtivos" /> 
          </Routes>
      </Row>
    </Container>
  </BrowserRouter>
  )
}

export default Rotas; 
