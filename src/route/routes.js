import React from "react";
import { Route, Routes, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Fundos from '../view/Fundos.js';
import CFundos from '../view/cadFundo.jsx';
import TransacaoCaixa from '../view/TransacaoCaixa.js';
import CTransacaoCaixa from '../view/cadTransacaoCaixa.jsx'
import TransacaoAtivo from '../view/TransacaoAtivo.js';
import CTransacaoAtivo from '../view/cadTransacaoAtivo.jsx';
import Ativos from '../view/Ativos.jsx';
import CAtivos from '../view/cadAtivos.jsx';
import CPrice from '../view/cadPrecoAtivos.jsx';
import LPrice from '../view/ListaPreco.jsx';
import FundReports from '../view/FundReports.jsx';
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
        <Route element={<CFundos/>} path="/Fundos/edit/:id" /> 
        
        <Route element={<TransacaoCaixa/>} path="/transacaoCaixa" /> 
        <Route element={<CTransacaoCaixa/>} path="/transacaoCaixa/new" /> 
        <Route element={<CTransacaoCaixa/>} path="/transacaoCaixa/edit/:id" /> 
        
        <Route element={<TransacaoAtivo/>} path="/transacaoAtivos" /> 
        <Route element={<CTransacaoAtivo/>} path="/transacaoAtivos/new" /> 
        <Route element={<CTransacaoAtivo/>} path="/transacaoAtivos/edit/:id" /> 
        
        <Route element={<CAtivos/>} path="/Ativos/new" /> 
        <Route element={<CAtivos/>} path="/Ativos/edit/:id" /> 
        <Route element={<Ativos/>} path="/Ativos" /> 
        <Route element={<CPrice/>} path="/Ativos/precos/edit/:id" /> 
        <Route element={<CPrice/>} path="/Ativos/precos/new" /> 
        <Route element={<LPrice/>} path="/Ativos/precos/historico" /> 
        
        <Route element={<FundReports/>} path="/Relatorios/fundos"/> 
    
      </Routes>
    </Container>
  </BrowserRouter>
  )
}

export default Rotas; 
