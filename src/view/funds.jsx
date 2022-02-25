import React, {userEffect} from "react"
import axios from "axios"; 


const Funds = (() => {
  userEffect(() => {
    axios.get(); 
  })
});
