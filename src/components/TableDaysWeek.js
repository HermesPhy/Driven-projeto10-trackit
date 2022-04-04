import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import styled from "styled-components";

export default function TableDaysWeek() {
    const { habit, token, callback, callbackEffect, callbackTable, load, callbackLoad } = props;
    const { name, days } = habit;

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
                    <label htmlFor="name"></label>
                    <input required value={name} type="text" id="name" placeholder="Nome do hábito" onInput={e => callback({...habit, name: e.target.value})} disabled={load} />

                    <div>
                        <input value={days} type="checkbox" id="domingo" onInput={() => getDay("domingo", 7)} disabled={load} />
                        <label htmlFor="domingo">D</label>
                        <input value={days} type="checkbox" id="segunda" onInput={() => getDay("segunda", 1)} disabled={load} />
                        <label htmlFor="segunda">S</label>
                        <input value={days} type="checkbox" id="terca" onInput={() => getDay("terca", 2)} disabled={load} />
                        <label htmlFor="terca">T</label>
                        <input value={days} type="checkbox" id="quarta" onInput={() => getDay("quarta", 3)} disabled={load} />
                        <label htmlFor="quarta">Q</label>
                        <input value={days} type="checkbox" id="quinta" onInput={() => getDay("quinta", 4)} disabled={load} />
                        <label htmlFor="quinta">Q</label>
                        <input value={days} type="checkbox" id="sexta" onInput={() => getDay("sexta", 5)} disabled={load} />
                        <label htmlFor="sexta">S</label>
                        <input value={days} type="checkbox" id="sabado" onInput={() => getDay("sabado", 7)} disabled={load} />
                        <label htmlFor="sabado">S</label>
                    </div>

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
    }

    input[type=text]::placeholder {
        font-family: 'Lexend Deca';
        font-size: 18px;
        color: #D4D4D4;
    }

    div input {
        display: none!important;
    }

    div input[type=checkbox] + label {
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

    div input[type=checkbox]:checked + label {
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