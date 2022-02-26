import React from "react";
import { Route, Routes, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Fundos from '../view/Fundos.js';
import CFundos from '../view/cadFundo.jsx';
import TransacaoCaixa from '../view/TransacaoCaixa.js';
import TransacaoAtivo from '../view/TransacaoAtivo.js';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyNavBar from "../components/MyNavBar.jsx";

const Rotas = () => {
  return (

  <BrowserRouter>
    <Container fluid="fluid">
        <MyNavBar/>
      <Routes> 
        <Route element={<Fundos/>} path="/Fundos" /> 
        <Route element={<CFundos/>} path="/Fundos/new" /> 
        <Route element={<TransacaoCaixa/>} path="/transacaoCaixa" /> 
        <Route element={<TransacaoAtivo/>} path="/transacaoAtivos" /> 
      </Routes>
    </Container>
  </BrowserRouter>
  )
}

export default Rotas; 
