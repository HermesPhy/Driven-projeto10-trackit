import { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import HabitsContext from "../contexts/HabitsContext";
import TokenContext from "../contexts/TokenContext";
import Header from "./Header";
import Footer from "./Footer";
import CheckMark from "../images/CheckMark.png";

export default function TodayHabitsScreen() {
    const { loginData } = useContext(TokenContext);
    const { habitsPercentage, setHabitsPercentage } = useContext(HabitsContext);
    const [todayHabits, setTodayHabits] = useState([]);
    const [callTodayHabits, setCallTodayHabits] = useState(false);

    dayjs.locale('pt-br');
    const day = require('dayjs/locale/pt-br');
    let now = dayjs();
    let getToday = dayjs(now).locale('pt-br').format('dddd, DD/MM');
    let firstLetter = getToday[0].toUpperCase();
    let end = getToday.slice(1);
    let today = firstLetter + end;

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", 
        {
        headers: {
            "Authorization": `Bearer ${loginData.token}`
            }
        });
        promise.then((response) => {
            const { data } = response;
            setTodayHabits(data);
            getPercentage();
        })
        promise.catch((err) => {
            console.log("erro", err.response.status);
        })
    }, [callTodayHabits])

    function getPercentage() {
        const doneHabits = todayHabits.filter((habit) => habit.done === true);
        let percentage = 0;
        if (todayHabits.length > 0) {
            percentage = Math.round((doneHabits.length / todayHabits.length) * 100);
        }
        setHabitsPercentage(percentage);
    }

    function checkDoneHabit(id) {
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, "", 
        {
            headers: {
                "Authorization": `Bearer ${loginData.token}`
            }
        });
        promise.then(() => {
            setCallTodayHabits(!callTodayHabits);
        })
        promise.catch((err) => {
            console.log("erro", err.response.status);
        })
    }

    function checkUndoneHabit(id) {
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, "", 
        {
            headers: {
                "Authorization": `Bearer ${loginData.token}`
            }
        });
        promise.then(() => {
            setCallTodayHabits(!callTodayHabits);
        })
        promise.catch((err) => {
            console.log("erro", err.response.status);
        })
    }

    function showTodayList() {
        return todayHabits.map((habit) => {
            const { id, name, done, currentSequence, highestSequence } = habit;
            return <ToDo key={id}>
                <h6>{name}</h6>
                
                <p>Sequência atual: 
                    <SpanCurrent selected={done}>
                        {currentSequence} {currentSequence !== "0" && currentSequence !== "1" ? ' dia' : ' dias'} 
                    </SpanCurrent>
                </p>
                <p>Seu recorde: 
                    <SpanHighest currentSeq={currentSequence} highestSeq={highestSequence}>
                        {highestSequence} {highestSequence !== "0" && highestSequence !== "1" ? ' dia' : ' dias'}
                    </SpanHighest>
                </p>

                <ThemeProvider theme={done ? selectedTheme : defaultTheme}>
                    <Checkbox onClick={() => { done ? checkUndoneHabit(id) : checkDoneHabit(id) }}>
                        <img src={CheckMark} alt="Botão checar" />
                    </Checkbox>
                </ThemeProvider>
            </ToDo>
        })
    }

    const showHabits = showTodayList();

    getPercentage();
    
    return (
        <Section>
            <Header />
            <Container>
                <h1>{today}</h1>
                {habitsPercentage ? <p>{habitsPercentage}% dos hábitos concluídos</p> : <h2>Nenhum hábito concluído ainda</h2>}
            </Container>

            <HabitsList>
                {todayHabits.length > 0 ? showHabits : <h3>Você pode criar uns hábitos bacaninhas lá na página Hábitos</h3>}
            </HabitsList>
            <Footer />
        </Section>
    )
}

function currentDaysColor(props) {
    const { selected } = props;
    if (selected) {
        return selectedTheme.dfColor;
    } else {
        return defaultDayColor.dfColor;
    }
}

function highestDayColor(currentSeq, highestSeq) {
    if (highestSeq !== 0) {
        if (currentSeq === highestSeq) {
            return selectedTheme.dfColor;
        } else {
            return defaultDayColor.dfColor;
        }
    }
}

const Section = styled.section`
    height: 100vh;
    background-color: #E5E5E5;
    overflow-y: scroll;

* {
    font-family: 'Lexend Deca';
    font-weight: 400;
}

h3 {
    margin-top: 10%;
    margin-left: 10px;
    margin-right: 20px;
    font-size: 18px;
    color: #666666;
}`;

const Container = styled.div`
    margin-top: 25%;
    margin-left: 20px;

h1 {
    font-size: 22.98px;
    color: #126BA5;
}

h2 {
    font-size: 18px;
    line-height: 22px;
    color: #BABABA;
}

p {
    font-size: 18px;
    line-height: 22px;
    color: #8FC549;
}`;

const HabitsList = styled.div`
    margin-bottom: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ToDo = styled.div`
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

    h6 {
        margin-left: 15px;
    }

    p {
        margin-left: 15px;
        font-size: 13px;
    }`;

    const Checkbox = styled.div`
        position: absolute;
        right: 10ox;
        bottom: 10px;
        width: 69px;
        height: 69px;
        border-radius: 5px;
        background-color: ${props => props.theme.dfColor};
        border: 1px solid #D4D4D4;
        text-align: center;
        line-height: 87px;
        cursor: pointer;

    img {
        width: 32px;
        height: 35px;
    }`;

    const defaultTheme = {
        dfColor: '#EBEBEB'
    };

    const selectedTheme = {
        dfColor: '#8FC549'
    };

    const defaultDayColor = {
        dfColor: '#666666'
    };

    const SpanHighest = styled.span`
        color: ${(props) => highestDayColor(props.currentSeq, props.highestSeq)}
    `;

    const SpanCurrent = styled.span`
        color: ${(selected) => currentDaysColor(selected)}
    `;