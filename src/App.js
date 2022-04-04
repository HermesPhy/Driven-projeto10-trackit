import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import TokenContext from "./contexts/TokenContext";
import HabitsContext from "./contexts/HabitsContext";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import HabitsScreen from "./components/HabitsScreen";
import TodayHabitsScreen from "./components/TodayHabitsScreen";
import HistoryScreen from "./components/HistoryScreen";

export default function App() {
    const [userData, setUserData] = useState({email: "", name: "", image: "", password: ""});
    const getData = {userData, setUserData};
    const [loginData, setloginData] = useState({image: "", token: ""});
    const getLoginData = {loginData, setloginData};
    const [habitsPercentage, setHabitsPercentage] = useState(null);
    const getHabitsPercentage = {habitsPercentage, setHabitsPercentage};

    return (
        <UserContext.Provider value={getData}>
            <TokenContext.Provider value={getLoginData}>
                <HabitsContext.Provider value={getHabitsPercentage}>

                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<LoginScreen />}></Route>
                            <Route path="/cadastro" element={<RegisterScreen />}></Route>
                            <Route path="/habitos" element={<HabitsScreen />}></Route>
                            <Route path="/hoje" element={<TodayHabitsScreen />}></Route>
                            <Route path="/historico" element={<HistoryScreen />}></Route>
                        </Routes>
                    </BrowserRouter>

                </HabitsContext.Provider>
            </TokenContext.Provider>
        </UserContext.Provider>
    )
}