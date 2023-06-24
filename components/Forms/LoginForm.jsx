import PasswordInput from "../FormElements/PasswordInput";
import TextInput from "../FormElements/TextInput";
import Link from "next/link";

// login form used by the login component
export default function LoginForm({
    styles,
    setLoginData,
    loginData,
    errors,
    handleForgotPassword,
    handleLogin,
    handleRegister,
    validLogin,
}) {
    return (
        <div onSubmit={handleLogin} className={styles.loginForm}>
            <form data-testid="login-form">
                <Link className={`${styles.skip} yellow`} href="/home">
                    Continue as guest
                </Link>
                <TextInput
                    className={styles.email}
                    name="Identifier"
                    label="Email"
                    placeholder="Input your email or username."
                    value={loginData.identifier}
                    error={errors.identifier}
                    autoComplete="no"
                    onChange={(event) =>
                        setLoginData({
                            ...loginData,
                            identifier: event.target.value,
                        })
                    }
                />
                <PasswordInput
                    className={styles.password}
                    label="Password"
                    name="Password"
                    placeholder="Input your password"
                    value={loginData.password}
                    error={errors.password}
                    autoComplete="no"
                    onChange={(event) =>
                        setLoginData({
                            ...loginData,
                            password: event.target.value,
                        })
                    }
                />

                {/** Will display an error message if they login is unsuccessful. The error message is purposely vague. */}
                {!validLogin && (
                    <div>
                        <p className={styles.errorMessage}>
                            Invalid credentials
                        </p>
                    </div>
                )}

                <div className={styles.buttons}>
                    <div className="btns">
                        <button
                            className="btn"
                            type="submit"
                            onClick={handleLogin}
                            disabled={
                                !loginData.identifier || !loginData.password
                            }
                            data-testid="login-button"
                        >
                            Login
                        </button>
                        <button
                            className="btn"
                            onClick={handleRegister}
                            data-testid="register-button"
                        >
                            Sign Up
                        </button>
                        <button
                            className="btn"
                            onClick={handleForgotPassword}
                            data-testid="forgot-password-button"
                        >
                            Forgot Password
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
