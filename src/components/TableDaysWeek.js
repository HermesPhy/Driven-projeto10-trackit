import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import styled from "styled-components";

export default function TableDaysWeek(props) {
    const { habit, token, callback, callbackEffect, callbackTable, load, callbackLoad } = props;
    const { name, days } = habit;
    const weekDays = [
        { name: 'domingo', letter:'D', number: 0 },
        { name: 'segunda', letter:'S', number: 1 },
        { name: 'terca', letter:'T', number: 2 },
        { name: 'quarta', letter:'Q', number: 3 },
        { name: 'quinta', letter:'Q', number: 4 },
        { name: 'sexta', letter:'S', number: 5 },
        { name: 'sabado', letter:'S', number: 6 }
    ];

    function markOffTable() {
        callbackTable(false);
        callbackLoad(false);
    }

    function forwardHabit(e) {
        e.preventDefault();
        callbackLoad(true);

        if (days.size > 0) {
            const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", 
            {
            name,
            days: Array.from(days.values())
            },
            {
            headers: {
            "Authorization": `Bearer ${token}`
            }
            });
            promise.then(() => {
                callback({ name: "", days: [] });
                callbackLoad(false);
                callbackTable(false);
                callbackEffect(true);
        })
        promise.catch((err) => {
            console.log(err.response.status);
            callbackLoad(false);
            alert(`Não foi possível processar o hábito. ${err.response.status}`);
            callback({ name: "", days: [] });
        })
        } else {
            alert("Escolha quais dias da semana você quer executar esse hábito.");
            callbackLoad(false);
        }
    }

    function getDay(id, number) {
        const selectDay = days.has(id);

        if (selectDay) {
            days.delete(id);
            callback({...habit, days: new Map(days)})
        } else {
            callback({...habit, days: new Map(days.set(id, number))})
        }
    }

    return (
        <Form>
            <form onSubmit={forwardHabit}>
                <section>
                    <input required value={name} type="text" id="name" placeholder="Nome do hábito" onInput={e => callback({...habit, name: e.target.value})} disabled={load} />

                    <article>
                        {weekDays.map((day, index) => {
                            return <div>
                                <input value={days} type="checkbox" id={day.name} key={index} 
                                    onInput={() => getDay(day.name, day.number)} disabled={load} />
                                <label htmlFor={day.name} >{day.letter}</label>
                            </div>
                        })}            
                    </article>

                </section>
                <Options>
                    <h6 onClick={markOffTable}>Cancelar</h6>
                    <button>
                        {load ? <ThreeDots color="#FFFFFF" width="51px" height="13px" /> : <div>Salvar</div>}
                    </button>
                </Options>
            </form>
        </Form>
    )
}

const Form = styled.form`
    width: 340px;
    height: 180px;
    margin-top: 5%;
    border-radius: 5px;
    background-color: #FFFFFF;
    font-family: 'Lexend Deca';

    section {
        margin-left: 18px;
    }

    input[type=text] {
        margin-top: 18px;
        width: 303px;
        height: 45px;
        border-radius: 5px;
        border: 1px solid #D4D4D4;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #666666;
    }

    input[type=text]::placeholder {
        font-family: 'Lexend Deca';
        font-size: 18px;
        color: #D4D4D4;
    }

    article {
        display: flex;
    }
    article div input {
        display: none!important;
    }

    article div input[type=checkbox] + label {
        width: 30px;
        height: 30px;
        margin-top: 8px;
        margin-right: 3px;
        border-radius: 5px;
        background-color: #FFFFFF;
        border: 1px solid #D4D4D4;
        cursor: pointer;
        display: inline-block;
        color: #D4D4D4;
        text-align: center;
        line-height: 30px;
    }

    article div input[type=checkbox]:checked + label {
        background-color: #CFCFCF;
        color: #FFFFFF;
    }`;

    const Options = styled.div`
        margin-top: 30px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        button {
            margin-right: 15px;
            margin-left: 30px;
            width: 84px;
            height: 35px;
            border: none;
            background-color: #52B6FF;
            border-radius: 5px;
            color: #FFFFFF;
            font-family: 'Lexend Deca';
            font-size: 16px;
        }`;