import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import Logo from "../images/LogoTrackit.png"

export default function RegisterScreen() {
    const { userData, setUserData } = useContext(UserContext);
    const [load, setLoad] = useState(false);

    const navigate = useNavigate();

    function makeRegister(e) {
        e.preventDefault();

        setLoad(true);
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", 
        {
            email: userData.email,
            password: userData.password,
            name: userData.name,
            image: userData.image
        });
        promise.then(() => navigate("/"));
        promise.catch((err) => {
            console.log (err.status)
            alert("Usuário não cadastrado.");
            setLoad(false);
            setUserData({ email: "", password: "", name: "", image: "" });
        });
    }

    return (
        <Main>
            <img src={Logo} alt="Logo do TrackIt" />
            <form onSubmit={makeRegister}>
                <input type="email" value={userData.email} onInput={e => setUserData({...userData, email: e.target.value})} placeholder="email" required disable={load} />
                <input type="password" value={userData.password} onInput={e => setUserData({...userData, password: e.target.value})} placeholder="senha" required disable={load} />
                <input type="text" value={userData.name} onInput={e => setUserData({...userData, name: e.target.value})} placeholder="nome" required disable={load} />
                <input type="url" value={userData.image} onInput={e => setUserData({...userData, image: e.target.value})} placeholder="foto" required disable={load} />

                <button>{load ? <ThreeDots color="#FFFFFF" width="51px" height="13px" /> : <div>Cadastrar</div>}</button>

            </form>

            <Link to = "/">
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </Main>
    );
}

const Main = styled.main`
    margin-top: 15vh;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;

img {
    width: 180px;
    height: 178.38px;
    margin-bottom: 32.62px;
}

* {
    font-family: 'Lexend Deca';
    font-weight: 400;
}

form {
    display: flex;
    flex-direction: column;
}

input {
    width: 303px;
    height: 45px;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: #FFFFFF;
    left: 36px;
    top: 279px;
    margin-bottom: 6px;
}

input::placeholder {
    font-size: 19.98px;
    color: #DBDBDB;
}

button {
    height: 45px;
    border: none;
    background-color: #52B6FF;
    border-radius: 4.64px;
    font-size: 20.98px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
}

p {
    font-size: 13.98px;
    color: #52B6FF;
    line-height: 17px;
    text-decoration-line: underline;
}`