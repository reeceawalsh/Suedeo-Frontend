import PasswordInput from "../FormElements/PasswordInput";
import TextInput from "../FormElements/TextInput";
import DateInput from "../FormElements/DateInput";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// registration form used by the register component
export default function RegistrationForm({
    styles,
    setRegistrationData,
    registrationData,
    errors,
    handleRegister,
    validRegistration,
}) {
    const [startDate, setStartDate] = useState(
        registrationData.dateOfBirth
            ? new Date(registrationData.dateOfBirth)
            : null
    );
    return (
        <div className={styles.registrationForm} data-testid="register-form">
            <form>
                {/* <TextInput
                    className={styles.username}
                    name="Username"
                    type="text"
                    placeholder="Input your username"
                    value={registrationData.username}
                    error={errors.username}
                    label="Username"
                    autoComplete="off"
                    onChange={(event) =>
                        setRegistrationData({
                            ...registrationData,
                            username: event.target.value,
                        })
                    }
                /> */}
                <TextInput
                    className={styles.email}
                    name="Email"
                    type="email"
                    placeholder="Input a valid email address"
                    value={registrationData.email}
                    error={errors.email}
                    label="Email"
                    autoComplete="no"
                    onChange={(event) =>
                        setRegistrationData({
                            ...registrationData,
                            email: event.target.value,
                        })
                    }
                />
                <div className="btns">
                    <button
                        className="btn"
                        onClick={handleRegister}
                        data-testid="create-account-button"
                    >
                        Next
                    </button>
                </div>
                {!validRegistration && (
                    <p className="error error-message">
                        That username or email is already taken.
                    </p>
                )}
            </form>
        </div>
    );
}
