import './App.css'
import MenuBar from "./components/MenuBar.tsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
function App() {

  return (
    <>
        <MenuBar />

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </>
  )
}

export default App
