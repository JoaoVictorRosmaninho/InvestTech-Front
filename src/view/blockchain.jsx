import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';

import { ethers } from "ethers";

const Blockchain = () => {
    const [accountBalance, setAccountBalance] = useState([]);
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    let signer;
    const daiAddress = "0xe07c6f83879b6c05082b092e1dcc9ea5f50e63c2";
    const daiAbi = [
        "function getPlByDateId(uint256 _date, uint32 _fundId) public view returns (string memory name, uint256 pl)",
        "function addPlByDate(uint _date, uint _pl, uint32 _fundId, string memory _name) public",
    ];

    useEffect(async () => {
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner()

    },[])
    
    async function getSeila() {
        const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

        let valor = await daiContract.getPlByDateId(20220311, 1);
        console.log("FEZ A CONSULTA");
        console.log(valor);

        setAccountBalance(ethers.utils.formatUnits(valor, 0));
    }

    async function fazerTranzacao() {
        try {
            const contract = new ethers.Contract(daiAddress, daiAbi, provider);
            const daiWithSigner = contract.connect(signer);
            await daiWithSigner.addPlByDate(20220311, 1000, 1, "Fundo teste");
        } catch (err) {
            console.log('capiroto ta agindo');
        }
    }

    return (
        <Container>
            <Button onClick={() => getSeila()}>
                Pegar Resultado
            </Button>

            <Button onClick={() => fazerTranzacao()}>
                Enviar Transação
            </Button>
            <br />
            <span>Resultado: {accountBalance}</span>
        </Container>
    );
}

export default Blockchain;