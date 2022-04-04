import styled from "styled-components";
import axios from "axios";

export default function DeleteHabits(props) {
    const { id, callbackEffect, token, callbackDelete } = props;

    function deleteHabit(e) {
        e.preventDefault();

        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, 
        {
        headers: {
            "Authorization": `Bearer ${token}`
            }
        });
        promise.then(() => {
            callbackDelete(false);
            callbackEffect(true);
        })
        promise.catch((err) => {
            console.log(err.response.status);
        })
    }

    function cancelDelete() {
        callbackDelete(false);
    }

    return (
        <Delete>
            <div>
                <h1>Tem certeza que deseja deletar este hábito?</h1>
                <h1 onClick={cancelDelete}>Cancelar</h1>
                <button onClick={deleteHabit}>Confirmar</button>
            </div>
        </Delete>
    )
}

const Delete = styled.div`
    position: fixed;
    z-index: 2;
    background: #00000050;
    width: 100%;
    height: 100vh;
    top: 0px;
    left: 0px;
    font-family: 'Lexend Deca';
    color: #666666;

    div {
        position: relative;
        top: 35%;
        margin-right: 5%;
        margin-left: 5%;
        height: 20vh;
        background: #FFFFFF;
        border-radius: 5px;
        padding: 20px;
        border: 1px solid #999999;
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }

    button {
        width: 84px;
        height: 35px;
        border: none;
        border-radius: 5px;
        background-color: #52B6FF;
        font-family: 'Lexend Deca';
        color: #FFFFFF;
    }`