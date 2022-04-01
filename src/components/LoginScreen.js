import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Logo from "../images/LogoTrackit.png"
import NameContext from "./../contexts/NameContext";
import TokenContext from "./../contexts/TokenContext";
import UserImageContext from "./../contexts/UserImageContext";

export default function LoginScreen() {
    const { setName } = useContext(NameContext);
    const { setToken } = useContext(TokenContext);
    const { setUserImage } = useContext(UserImageContext);
    
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function makeLogin(e) {
        e.preventDefault();

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", 
        {
            email,
            password: senha,
        });
        promise.then((response) => {
            const { data } = response;
            console.log(data);
            setToken(data.token);
            setName(data.name);
            setUserImage(data.image);
        });
        promise.catch(err => {
            console.log (err.status);
            setEmail("");
            setSenha("");
            alert("Usuário ou senha inválidos");
        });

        changeScreen();
    }

    let navigate = useNavigate();

    function changeScreen() {
        navigate("/habitos");
    }
    
    return (
        <Main>
            <img src={Logo} alt="Logo do TrackIt" />
            <form onSubmit={makeLogin}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required />
                <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="senha" required />
                <button type="submit">Entrar</button>
            </form>

            <Link to = "/cadastro">
                <p>Não tem uma conta? Cadastre-se!</p>
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
}

p {
    font-weight: 400;
    font-size: 13.98px;
    color: #52B6FF;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
}`