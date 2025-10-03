import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PasswordReset from "../pages/PasswordReset";
import EmailVerification from "../pages/EmailVarification";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage></HomePage>,
    },
    {
        path: '/login',
        element: <LoginPage></LoginPage>
    },
    {
        path: '/resetPassword',
        element: <PasswordReset></PasswordReset>
    },
    {
        path: '/emailVerification',
        element: <EmailVerification></EmailVerification>
    },
]);
