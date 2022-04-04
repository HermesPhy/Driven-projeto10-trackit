import { useContext } from "react";
import styled from "styled-components";
import TokenContext from "../contexts/TokenContext";

export default function Header() {
    const { loginData } = useContext(TokenContext);

    return (
        <TopBar>
                <h1>TrackIt</h1>
                <img src={`${loginData.image}`} alt="Foto do usuário" />
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
        margin-left: 5%;
    }

    img {
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
        margin-right: 7%;
    }`