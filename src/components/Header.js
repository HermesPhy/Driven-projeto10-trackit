import { useNavigate } from "react-router-dom";
import React from "react";
import styled from "styled-components";

export default function Header() {
    const image = localStorage.getItem("image");
    const navigate = useNavigate();

    function stopApp() {
        localStorage.removeItem("token");
        localStorage.removeItem("image");
        navigate("/");
    }
    
    return (
        <TopBar>
            <h1>TrackIt</h1>
            <article>
                <img src={`${image}`} alt="Foto do usuário" />
                <button onClick={stopApp}>
                    <div>
                        <h4>S</h4><h4>A</h4><h4>I</h4><h4>R</h4>
                    </div>
                </button>
            </article>
        </TopBar>
    )
}

const TopBar = styled.header`
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 2;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        color: #FFFFFF;
        font-family: 'Playball';
        font-weight: 400;
        font-size: 38.98px;
        margin-left: 15px;
    }

    article {
        display: flex;
        align-items: center;
    }
    
    article img {
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
        margin-right: 10px;
    }
    
    article button {
        margin-right: 20px;
        width: 22px;
        height: 65px;
        border: none;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
        border-radius: 5px;
        background-color: #1480C7;
        font-family: 'Lexend Deca';
        font-size: 12px;
        line-height: 13px;
        color: #FFFFFF;
        cursor: pointer;
    }`