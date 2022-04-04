import { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import axios from "axios";
import TokenContext from "../contexts/TokenContext";
import Header from "./Header";
import Footer from "./Footer";
import TableDaysWeek from "./TableDaysWeek";
//import PopUpDelete from "./PopUpDelete";
import Dump from "../images/Dump.png";

export default function HabitsScreen() {
    const { loginData } = useContext(TokenContext);
    const [habitsTable, setHabitsTable] = useState(false);
    const [renderHabits, setRenderHabits] = useState([]);
    const [newHabit, setNewHabit] = useState({ name: '', days: new Map()});
    const [load, setLoad] = useState(false);
    const [callUseEffect, setCallUseEffect] = useState(false);
    const [popUp, setPopUp] = useState("");

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", 
        {
        headers: {
            "Authorization": `Bearer ${loginData.token}`
            }
        });
        promise.then((response) => {
            const { data } = response;
            setRenderHabits(data);
            setCallUseEffect(false);
            showHabitsList();
        })
        promise.catch((err) => {
            console.log("erro", err.response.status);
        })
    }, [callUseEffect])

    function askDeleteHabit(id) {
        setPopUp(id);
    }

    function showHabitsList() {
        return renderHabits.map((habit) => {
            const { id, name, days } = habit;
            return <HabitContainer key={id}>
                <h1>{name}</h1>
                <button onClick={() => askDeleteHabit(id)}>
                    <img src={Dump} alt="Deletar hábito" />
                </button>

                <section>
                    <ThemeProvider theme={days.includes(7) ? invertedColor : color}>
                        <Day>D</Day>
                    </ThemeProvider>
                    <ThemeProvider theme={days.includes(1) ? invertedColor : color}>
                        <Day>S</Day>
                    </ThemeProvider>
                    <ThemeProvider theme={days.includes(2) ? invertedColor : color}>
                        <Day>T</Day>
                    </ThemeProvider>
                    <ThemeProvider theme={days.includes(3) ? invertedColor : color}>
                        <Day>Q</Day>
                    </ThemeProvider>
                    <ThemeProvider theme={days.includes(4) ? invertedColor : color}>
                        <Day>Q</Day>
                    </ThemeProvider>
                    <ThemeProvider theme={days.includes(5) ? invertedColor : color}>
                        <Day>S</Day>
                    </ThemeProvider>
                    <ThemeProvider theme={days.includes(6) ? invertedColor : color}>
                        <Day>S</Day>
                    </ThemeProvider>
                </section>
            </HabitContainer>
        })
    }

    const showTotalHabits = showHabitsList();
    
    return (
        <Section>
            <Header />
            <Container>
                <h1>Meus hábitos</h1>
                <button onClick={() => setHabitsTable(!habitsTable)}>+</button>
            </Container>

            {habitsTable ? <TableDaysWeek habit={newHabit} 
                token={loginData.token} 
                callback={setNewHabit} 
                callbackEffect={setCallUseEffect} 
                callbackTable={setHabitsTable}
                load={load}
                callbackLoad={setLoad}
                /> : " "}

            {popUp && <PopUpDelete
                id={popUp}
                callbackEffect={setCallUseEffect}
                token={loginData.token}
                callbackPopUp={setPopUp}
                />}

            <HabitList>
                {renderHabits.length > 0 ? showTotalHabits : 
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>}
            </HabitList>
            <Footer />
        </Section>
    )
}

const Section = styled.section`
    background-color: #E5E5E5;
    height: 100vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
    margin-top: 10%;
    margin-left: 10px;
    margin-right: 10px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 18px;
    color: #666666;
    }`;

const Container = styled.div`
    margin-top: 25%;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    align-items: center;

    h1 {
    margin-right: 150px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 22.98px;
    color: #126BA5;
    }

    button {
    width: 40px;
    height: 35px;
    color: #FFFFFF;
    border: none;
    background-color: #52B6FF;
    border-radius: 4.64;
    }`;

const HabitList = styled.div`
    margin-bottom: 30%;
    `;

const HabitContainer = styled.div`
    position: relative;
    background-color: #FFFFFF;
    margin-top: 10px;
    width: 340px;
    height: 91px;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 18px;
    color: #666666;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background-color: transparent;
    }

    img {
        width: 14px;
        height: 16px;
    }

    h1 {
        margin-left: 15px;
    }

    section {
        margin-left: 15px;
    }`;

    const Day = styled.div`
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-top: 8px;
        margin-right: 3px;
        border-radius: 5px;
        border: 1px solid #D4D4D4;
        text-align: center;
        line-height: 30px;
        color: ${props => props.theme.dfColor};
        background-color: ${props => props.theme.dfBack};
    `;

    const color = {
        dfColor: "#D4D4D4",
        dfBack: "#FFFFFF"
    };

    const invertedColor = {
        dfColor: "#FFFFFF",
        dfBack: "#D4D4D4"
    };