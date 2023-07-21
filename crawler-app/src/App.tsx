import './App.css'
import MenuBar from "./components/MenuBar.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import {AppUserContext, OrdersContext} from "./context/StateContext";
import { useState, useEffect } from 'react';
import {OrderGetAllDto} from "./types/OrderTypes.ts";
import SocialLoginPage from "./pages/SocialLoginPage";
import {LocalJwt, LocalUser} from "./types/AuthTypes.ts";
import {getClaimsFromJwt} from "./utils/jwtHelper";
function App() {

    const navigate = useNavigate();

    const [appUser, setAppUser] = useState<LocalUser | undefined>(undefined);
    const [orders, setOrders] = useState<OrderGetAllDto[]>([]);

    useEffect(() => {

        const jwtJson = localStorage.getItem("crawler_user");

        if (!jwtJson) {
            navigate("/login");
            return;
        }

        const localJwt: LocalJwt = JSON.parse(jwtJson);

        const {uid, email, given_name, family_name} = getClaimsFromJwt(localJwt.accessToken);

        const expires: string = localJwt.expires;

        setAppUser({
            id: uid,
            email,
            firstName: given_name,
            lastName: family_name,
            expires,
            accessToken: localJwt.accessToken
        });


    }, []);

    return (
        <>
            <AppUserContext.Provider value={ {appUser, setAppUser} }>
                <OrdersContext.Provider value={ {orders, setOrders} }>
                    <MenuBar />

                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />}/>
                        <Route path="/social-login" element={<SocialLoginPage />}/>
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </OrdersContext.Provider>
            </AppUserContext.Provider>
        </>
    )
}

export default App
