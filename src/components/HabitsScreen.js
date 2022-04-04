import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import TableDaysWeek from "./TableDaysWeek";
import DeleteHabits from "./DeleteHabits";
import Dump from "../images/Dump.png";

export default function HabitsScreen() {
    const token = localStorage.getItem("token");
    const [habitsTable, setHabitsTable] = useState(false);
    const [renderHabits, setRenderHabits] = useState([]);
    const [newHabit, setNewHabit] = useState({ name: '', days: new Map()});
    const [load, setLoad] = useState(false);
    const [callUseEffect, setCallUseEffect] = useState(false);
    const [turnOff, setTurnOff] = useState("");

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", 
        {
        headers: {
            "Authorization": `Bearer ${token}`
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
        setTurnOff(id);
    }

    function showHabitsList() {
        const weekDays = [
            { letter: 'D', number: 0 },
            { letter: 'S', number: 1 },
            { letter: 'T', number: 2 },
            { letter: 'Q', number: 3 },
            { letter: 'Q', number: 4 },
            { letter: 'S', number: 5 },
            { letter: 'S', number: 6 },
        ];
        
        return renderHabits.map((habit) => {
            const { id, name, days } = habit;
            return <HabitContainer key={id}>
                <h1>{name}</h1>
                <button onClick={() => askDeleteHabit(id)}>
                    <img src={Dump} alt="Deletar hábito" />
                </button>

                <section>
                    {weekDays.map((day, index) => {
                        return <ThemeProvider theme={days.includes(day.number) ? invertedColor : color} key={index}>
                            <Day>{day.letter}</Day>
                        </ThemeProvider>;
                    })}
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

            <Main>
            {habitsTable ? <TableDaysWeek 
                habit={newHabit}
                token={token}
                callback={setNewHabit}
                callbackEffect={setCallUseEffect}
                callbackTable={setHabitsTable}
                load={load}
                callbackLoad={setLoad}
            /> : " "}

            {turnOff && <DeleteHabits 
                id={turnOff} 
                callbackEffect={setCallUseEffect} 
                token={token}
                callbackPopUp = {setTurnOff} />}

            {renderHabits.length > 0 ? showTotalHabits
                : <p>Você não tem nenhum hábito cadastrado ainda.
                    Adicione um hábito para começar a trackear!</p>}
            </Main>

            <Footer />
        </Section>
    )
}

const Section = styled.section`
    background-color: #E5E5E5;
    height: 100vh;
    overflow-y: scroll;

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
    margin-top: 80px;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
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
    background: #52B6FF;
    border-radius: 5px;
    margin-right: 15px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 27px;
    line-height: 5px;
    }`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30%;
    `;

const HabitContainer = styled.div`
    position: relative;
    background-color: #FFFFFF;
    margin-top: 10px;
    width: 340px;
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
        margin: 10px;
        margin-left: 15px;
        margin-right: 30px;
    }

    section {
        margin: 10px 15px;
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