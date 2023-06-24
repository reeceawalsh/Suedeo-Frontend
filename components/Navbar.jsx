import SettingsIcon from "@mui/icons-material/Settings";
import styles from "./styles/navbar.module.css";
import Image from "next/image";
import { useUser } from "../util/context/UserContext";
import Link from "next/link";

const logo = require("../public/RectangleLogo.png");
const userIcon = require("../public/logo.jpeg");

const Navbar = () => {
    const { user } = useUser();
    return (
        <div className={styles.navbar}>
            <div className={styles.navContainer}>
                <div className={styles.navLeft}>
                    <Image
                        id="logo"
                        className={styles.logo}
                        src={logo}
                        alt="Suedeo Logo"
                    />
                    <Link href="/home" className={styles.navBarLink}>
                        Home
                    </Link>
                    <span className={styles.navBarLink}>Series</span>
                    <span className={styles.navBarLink}>Movies</span>
                    <span className={styles.navBarLink}>Watch List</span>
                </div>
                <div className={styles.navRight}>
                    {/* <TextField
                        id="search"
                        label="Search"
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon className={styles.icon} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    /> */}
                    <span id={styles.userName}>
                        {user ? (
                            user.username
                        ) : (
                            <div className={styles.right}>
                                <Link href="/signup">Sign Up</Link>
                                <Link href="/login">Login</Link>
                            </div>
                        )}
                    </span>
                    {user && (
                        <>
                            <SettingsIcon className={styles.icon} />

                            <div className={styles.icon} />
                            <Image
                                id="profile-img"
                                className={styles.profile}
                                src={userIcon}
                                alt="Profile Pic"
                            />
                            <div className={styles.profile}>
                                <div className={styles.icon} />
                                <div className={styles.options}>
                                    <span>Logout</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
