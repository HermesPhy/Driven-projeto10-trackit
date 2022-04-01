import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Logo from "../images/LogoTrackit.png"

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");

    const navigate = useNavigate();

    function makeRegister(e) {
        e.preventDefault();

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", 
        {
            email,
            password: senha,
            name: nome,
            image: foto,
        });
        promise.then(() => navigate("/"));
        promise.catch(err => console.log (err.status));
    }
    return (
        <Main>
            <img src={Logo} alt="Logo do TrackIt" />
            <form onSubmit={makeRegister}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required />
                <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="senha" required />
                <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="nome" required />
                <input type="url" value={foto} onChange={e => setFoto(e.target.value)} placeholder="foto" required />

                <button type="submit">Cadastrar</button>

            </form>

            <Link to = "/">
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </Main>
    );
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;

* {
    font-family: 'Lexend Deca', sans-serif;
}

img {
    width: 180px;
    height: auto;
    margin: 68px 0 33px 0;
}

form {
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
}

input {
    width: 303px;
    height: 45px;
    border: 1px solid #D4D4D4;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: #FFFFFF;
    margin-bottom: 6px;
    padding-left: 11px;
    overflow-x: hidden;
    font-weight: 400;
    font-size: 19.98px;
    line-height: 25px;
    color: #DBDBDB;
}

form button {
    width: 303px;
    height: 45px;
    background-color: #52B6FF;
    left: 36px;
    top: 381px;
    border-style: none;
    border-radius: 4.64px;
    font-weight: 400;
    font-size: 20.98px;
    color: #FFFFFF;
    line-height: 26px;
    margin-bottom: 25px;
    cursor: pointer;
}

p {
    font-weight: 400;
    font-size: 13.98px;
    color: #52B6FF;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
}`