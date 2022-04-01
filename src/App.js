import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NameContext from "./contexts/NameContext";
import TokenContext from "./contexts/TokenContext";
import UserImageContext from "./contexts/UserImageContext";
import HabitsScreen from "./components/LoginScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";

export default function App() {
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    const [userImage, setUserImage] = useState("");

    return (
        <TokenContext.Provider value={{ token, setToken}}>
            <NameContext.Provider value={{ name, setName}}>
                <UserImageContext.Provider value={{ userImage, setUserImage}}>

                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<LoginScreen />}></Route>
                            <Route path="/cadastro" element={<RegisterScreen />}></Route>
                            <Route path="/habitos" element={<HabitsScreen />}></Route>
                        </Routes>
                    </BrowserRouter>

                </UserImageContext.Provider>
            </NameContext.Provider>
        </TokenContext.Provider>
    );
}