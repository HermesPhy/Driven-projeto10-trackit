import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";
import Logo from "../images/LogoTrackit.png"

export default function LoginScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate("/hoje");
        }
    })

    const [userLogin, setUserLogin] = useState({email:"", password:""});
    const [load, setLoad] = useState(false);

    function makeLogin(e) {
        e.preventDefault();

        setLoad(true);
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", 
        {
            email: userLogin.email,
            password: userLogin.password
        });
        promise.then((response) => {
            const { data } = response;
            localStorage.setItem("token", data.token);
            localStorage.setItem("image", data.image);
            navigate("/hoje"); 
        });
        promise.catch((err) => {
            console.log (err.status)
            alert("Login incorreto.");
            setLoad(false);
            setUserLogin({ email: "", password: "" });
        });
    }

    return (
        <Main>
            <img src={Logo} alt="Logo do TrackIt" />
            <form onSubmit={makeLogin}>
                <input type="email" value={userLogin.email} onInput={e => setUserLogin({...userLogin, email: e.target.value})} disabled={load} placeholder="email" required />
                <input type="password" value={userLogin.password} onInput={e => setUserLogin({...userLogin, password: e.target.value})} disabled={load} placeholder="senha" required />
                <button> 
                    {load ? <ThreeDots color="#FFFFFF" width="51px" height="13px" /> : <div>Entrar</div>}
                </button>
            </form>

            <Link to={"/cadastro"}>
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
        </Main>
    )
}

const Main = styled.main`
    margin-top: 15vh;
    display: flex;
    flex-direction: column;
    align-items: center;

img {
    width: 180px;
    height: 178.38px;
}

form {
    margin-top: 15vh;
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
    margin-bottom: 2%;
    left: 36px;
    top: 279px;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    color: #666666;
}
 
input::placeholder {
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 19.98px;
    color: #DBDBDB;
}

button {
    height: 45px;
    background-color: #52B6FF;
    border: none;
    border-radius: 4.64px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 20.98px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
}

p {
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 13.98px;
    color: #52B6FF;
    line-height: 17px;
    margin-top: 25px;
    text-decoration-line: underline;
}`