import PasswordInput from "../FormElements/PasswordInput";
import TextInput from "../FormElements/TextInput";
import DateInput from "../FormElements/DateInput";
import Link from "next/link";
import { useState } from "react";

// registration form used by the register component
export default function RegistrationForm({
    styles,
    setRegistrationData,
    registrationData,
    errors,
    handleRegister,
    alreadyRegistered,
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
                <Link className={`${styles.skip} yellow`} href="/home">
                    Skip
                </Link>
                <TextInput
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
                />
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
                {alreadyRegistered && (
                    <div>
                        <p>
                            An account with this email address already exists.
                        </p>
                    </div>
                )}
                <DateInput
                    selected={startDate}
                    name="Date"
                    label="Date of Birth"
                    value={registrationData.dateOfBirth}
                    error={errors.dateOfBirth}
                    onChange={(date) => {
                        setStartDate(date);
                        let formattedDate = "";
                        if (date) {
                            formattedDate = date.toISOString().substring(0, 10);
                        }
                        setRegistrationData({
                            ...registrationData,
                            dateOfBirth: formattedDate,
                        });
                    }}
                />
                <PasswordInput
                    className={styles.password}
                    name="Password"
                    label="Password"
                    placeholder="Password"
                    value={registrationData.password}
                    error={errors.password}
                    autoComplete="no"
                    onChange={(event) =>
                        setRegistrationData({
                            ...registrationData,
                            password: event.target.value,
                        })
                    }
                />

                <button
                    className="btn"
                    onClick={handleRegister}
                    data-testid="create-account-button"
                >
                    Create Account
                </button>
                {!validRegistration && (
                    <p className="error error-message">
                        That username or email is already taken.
                    </p>
                )}
            </form>
        </div>
    );
}
