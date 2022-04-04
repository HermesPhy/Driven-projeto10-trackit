import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";
import Logo from "../images/LogoTrackit.png"
import TokenContext from "./../contexts/TokenContext";

export default function LoginScreen() {
    const { loginData, setLoginData } = useContext(TokenContext);
    const [userLogin, setUserLogin] = useState({email:"", password:""});
    const [load, setLoad] = useState(false);
    
    const navigate = useNavigate();

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
            setLoginData({image: data.image, token: data.token});
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

            <Link to = "/cadastro">
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
    margin-bottom: 6px;
    left: 36px;
    top: 279px;
}
 
input::placeholder {
    font-size: 19.98px;
    color: #DBDBDB;
}

button {
    width: 303px;
    height: 45px;
    background-color: #52B6FF;
    border: none;
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