import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import User from "./pages/user/User";
import Enem from "./pages/vestibulares/enem/Enem";
import Etec from "./pages/vestibulares/etec/Etec";
import Fatec from "./pages/vestibulares/fatec/Fatec";
import BelasArtes from "./pages/vestibulares/belasArtes/BelasArtes";
import Fuvest from "./pages/vestibulares/fuvest/Fuvest";
import Mackenzie from "./pages/vestibulares/mackenzie/Mackenzie";
import Comvest from "./pages/vestibulares/comvest/Comvest";
import Unesp from "./pages/vestibulares/unesp/Unesp";
import NucVest from "./pages/vestibulares/nucVest/NucVest";
import Fgv from "./pages/vestibulares/fgv/Fgv";
import AboutUs from "./pages/aboutUs/AboutUs";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signin" element={<SignIn />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/user" element={<User />}></Route>
                <Route path="/enem" element={<Enem />}></Route>
                <Route path="/etec" element={<Etec />}></Route>
                <Route path="/fatec" element={<Fatec />}></Route>
                <Route path="/belasartes" element={<BelasArtes />}></Route>
                <Route path="/fuvest" element={<Fuvest />}></Route>
                <Route path="/mackenzie" element={<Mackenzie />}></Route>
                <Route path="/aboutus" element={<AboutUs />}></Route>
                <Route path="/comvest" element={<Comvest />}></Route>
                <Route path="/unesp" element={<Unesp />}></Route>
                <Route path="/nucvest" element={<NucVest />}></Route>
                <Route path="/fgv" element={<Fgv />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;