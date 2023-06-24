import { useState } from "react";
import useSetToken from "@component/util/hooks/useSetToken";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./styles/login.module.css";
import validate from "../validationRules/LoginVR";
import LoginForm from "./Forms/LoginForm";
import loginUser from "@component/util/helperFunctions/loginUser";

// login component for the login page
const LoginContainer = () => {
    // loginDetails are details the user inputs before validation
    const [loginData, setLoginData] = useState({
        identifier: "",
        password: "",
    });

    const router = useRouter();
    const [errors, setErrors] = useState([]);
    const [validLogin, setValidLogin] = useState(true);
    const [displayModal, setDisplayModal] = useState(false);
    const setToken = useSetToken();

    // handles pressing the login button.
    const handleLogin = (e) => {
        console.log("loginProcess");
        e.preventDefault();

        // runs validation on the login details.
        let newErrors = checkErrors(loginData);
        console.log(newErrors);
        // if there are no errors...
        if (Object.keys(newErrors).length === 0) {
            // checks if the user is a valid user.
            handleCheckUser();
        } else {
            console.log("errors");
            // resets the form inputs.
            setLoginData({ identifier: "", password: "" });
        }
    };

    // attempts to log the user in with their given identifier, their email or username, and password.
    const handleCheckUser = () => {
        console.log("checking user");
        let userData = {
            identifier: loginData.identifier,
            password: loginData.password,
        };
        console.log(userData);
        loginUser(userData)
            .then(function (response) {
                console.log(response.data);
                setToken(response.data);
                setValidLogin(true);
                router.push("/home");
            })
            .catch(function (error) {
                console.error("Request failed");
                if (error.response) {
                    console.error("Server response:", error.response.data);
                }
                setValidLogin(false);
            });
    };

    // handles pressing the register button which will route the user to the registration page.
    const handleRegister = (e) => {
        e.preventDefault();
        router.push("/signup");
    };

    // checks for errors using the validation rules located in the  LoginVR file in the validationRules folder.
    const checkErrors = (data) => {
        let newErrors = validate(data);
        setErrors(newErrors);
        return newErrors;
    };

    // handles clicking on the forgot password button, it toggles the modal that will allow users to input their email and send a link to change their password.
    const handleForgotPassword = (e) => {
        setDisplayModal(!displayModal);
        setErrors([]);
        e.preventDefault();
    };

    // handles clicking out of the modal (will close it)
    const handleCancel = (e) => {
        e.preventDefault();
        setErrors({});
        setDisplayModal(!displayModal);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}></div>
            <div className={styles.subContainer}>
                <LoginForm
                    styles={styles}
                    setLoginData={setLoginData}
                    loginData={loginData}
                    errors={errors}
                    handleForgotPassword={handleForgotPassword}
                    handleLogin={handleLogin}
                    handleRegister={handleRegister}
                    validLogin={validLogin}
                />
                {/* <ForgotPassword
                        styles={styles}
                        displayModal={displayModal}
                        setDisplayModal={setDisplayModal}
                        loginData={loginData}
                        setLoginData={setLoginData}
                        handleCancel={handleCancel}
                        handleForgotPassword={handleForgotPassword}
                        errors={errors}
                    /> */}
            </div>
        </div>
    );
};

export default LoginContainer;
