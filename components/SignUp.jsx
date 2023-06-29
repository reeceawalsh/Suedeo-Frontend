import { useState, useEffect } from "react";
import useSetToken from "@component/util/hooks/useSetToken";
import { useUser } from "@component/util/context/UserContext";
import styles from "./styles/signup.module.css";
import validate from "../validationRules/RegistrationVR";
import RegistrationForm from "./Forms/RegistrationForm";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import registerUser from "@component/util/helperFunctions/registerUser";
const logo = require("../public/logo.jpeg");
// registration component which contains a form that handles registrations.
const SignUp = () => {
    const { user } = useUser();
    const [errors, setErrors] = useState([]);
    const [validRegistration, setValidRegistration] = useState(true);
    const setToken = useSetToken();
    const router = useRouter();

    // redirect logged-out users to the homepage
    useEffect(() => {
        if (user) {
            router.push("/home");
        }
    }, [user, router]);

    // empty registrationData
    const [registrationData, setRegistrationData] = useState({
        username: "",
        email: "",
        password: "",
        dateOfBirth: "",
    });

    // handles clicking the register button
    const handleRegister = (e) => {
        console.log("registration Process");
        e.preventDefault();

        // runs validation on the registration details
        let newErrors = checkErrors(registrationData);

        // if there are no errors...
        if (Object.keys(newErrors).length === 0) {
            handleCheckRegistered();
        } else {
            console.log("errors", newErrors);
            setErrors(newErrors);
        }
    };

    // posts email, username, password and DOB to be added to Database
    const handleCheckRegistered = () => {
        console.log("checking user");
        let userData = {
            email: registrationData.email,
            username: registrationData.username,
            password: registrationData.password,
            dateOfBirth: registrationData.dateOfBirth,
        };
        registerUser(userData)
            .then(function (response) {
                console.log(response.data);
                setToken(response.data);
                console.log(user);
                setValidRegistration(true);
            })
            .catch(function (error) {
                console.error("Request failed");
                if (error.response) {
                    console.error("Server response:", error.response.data);
                }
                setValidRegistration(false);
            });
    };

    // checks for errors using RegistrationVR. Ensures the password and dob are valid and that their is a valid email and username present.
    const checkErrors = (data) => {
        let newErrors = validate(data);
        setErrors(newErrors);
        return newErrors;
    };

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <RegistrationForm
                    styles={styles}
                    setRegistrationData={setRegistrationData}
                    registrationData={registrationData}
                    errors={errors}
                    handleRegister={handleRegister}
                    validRegistration={validRegistration}
                />
            </div>
        </div>
    );
};

export default SignUp;
