import './App.css'
import MenuBar from "./components/MenuBar.tsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import {AppUserContext, OrdersContext} from "./context/StateContext";
import { useState } from 'react';
import {LocalUser} from "./types/AuthTypes.ts";
import {OrderGetAllDto} from "./types/OrderTypes.ts";
function App() {

    const [appUser, setAppUser] = useState<LocalUser | undefined>(undefined);
    const [orders, setOrders] = useState<OrderGetAllDto[]>([]);

    return (
        <>
            <AppUserContext.Provider value={ {appUser, setAppUser} }>
                <OrdersContext.Provider value={ {orders, setOrders} }>
                    <MenuBar />

                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </OrdersContext.Provider>
            </AppUserContext.Provider>
        </>
    )
}

export default App
