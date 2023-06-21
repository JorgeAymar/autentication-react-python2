//layout.js

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Private from "./pages/Private.jsx";
import NotFound from "./pages/NotFound.jsx";
import { AuthProvider } from "./store/AuthContext";
import ProtectedRoute from './component/ProtectedRoute.jsx';
import NoAutorizado from './pages/NoAutorizado.jsx';

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <BrowserRouter basename={basename}>
            <AuthProvider> {/* Wrap the component tree with AuthProvider */}
                <div>
                    <ScrollToTop>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/noautorizado" element={<NoAutorizado />} />
                            <Route path="/private" element={<ProtectedRoute><Private /></ProtectedRoute>} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                        <Footer />
                    </ScrollToTop>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default injectContext(Layout);
