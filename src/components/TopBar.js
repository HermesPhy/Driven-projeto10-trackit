import { useContext } from "react";
import styled from "styled-components";
import TrackitSmall from "../images/TrackitSmall.png"
import NameContext from "../contexts/NameContext";
import UserImageContext from "../contexts/UserImageContext";

export default function TopBar() {
    const { name } = useContext(NameContext);
    const { userImage } = useContext(UserImageContext);

    return (
        <Header>
            <img className="trackitSmall" src={TrackitSmall} alt="Trackit" />

            <div className="userInfo">
                <p>Olá, {name}!</p>
                <img className="userImage" src={userImage} alt="Foto do usuário" />
            </div>
        </Header>
    );
}

const Header = styled.header`
    width: 100%;
    height: 70px;
    padding-left: 18px;
    background-color: #126BA5;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .trackitSmall {
        width: 97px;
        height: auto;
        color: #FFFFFF;
    }

    .userInfo {
        display: flex;
        align-items: center;
        margin-right: 36px;
    }

    .userInfo p {
        color: #FFFFFF;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 15px;
        line-height: 26px;
    }

    .userInfo img {
        width: 51px;
        height: 51px;
        border-radius: 50%;
        margin-left: 20px;
        background-image: inherit;
    }`