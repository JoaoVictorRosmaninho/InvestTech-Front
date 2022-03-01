import './App.css';
import React from "react";
import Routes from './route/routes.js'
import { useParams } from 'react-router-dom'

function App() {

  const { id } = useParams();
  return (
    <Routes id={id ? Number(id) : null}/>
  );
}

export default App
