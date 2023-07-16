import {useContext} from "react";
import {AppUserContext} from "../context/StateContext.tsx";

function LoginPage() {

    const { setAppUser } = useContext(AppUserContext);

    return (
        <div></div>
    );
}

export default LoginPage;