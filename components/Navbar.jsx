import SettingsIcon from "@mui/icons-material/Settings";
import styles from "./styles/navbar.module.css";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { useUser } from "../util/context/UserContext";
import Link from "next/link";
import { MediaTypeContext } from "@component/util/context/MediaTypeContext";
const logo = require("../public/RectangleLogo.png");
const userIcon = require("../public/logo.jpeg");
import { useRouter } from "next/router";

const Navbar = () => {
    const { user, logout } = useUser();
    const { mediaType, toggleMediaType } = useContext(MediaTypeContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const router = useRouter();
    const currentPath = router.pathname;
    // handles logging out
    const handleLogout = () => {
        logout();
    };
    return (
        <div className={styles.navbar}>
            <Image
                id="logo"
                className={styles.logo}
                src={logo}
                alt="Suedeo Logo"
            />
            <div className={styles.navRight}>
                <div className={styles.navLinks}>
                    <Link
                        href="/home"
                        className={`${styles.navBarLink} 
                            ${
                                router.pathname === "/home"
                                    ? styles.navBarLinkActive
                                    : styles.navBarLinkInactive
                            }`}
                    >
                        Home
                    </Link>
                    {currentPath === "/home" &&
                        (mediaType === "movie" ? (
                            <span
                                onClick={toggleMediaType}
                                className={styles.navBarLink}
                            >
                                Series
                            </span>
                        ) : (
                            <span
                                onClick={toggleMediaType}
                                className={styles.navBarLink}
                            >
                                Movies
                            </span>
                        ))}

                    {user && (
                        <Link
                            href="/home/watchlist"
                            className={`${styles.navBarLink} 
                            ${
                                router.pathname === "/home/watchlist"
                                    ? styles.navBarLinkActive
                                    : styles.navBarLinkInactive
                            }`}
                        >
                            Watch List
                        </Link>
                    )}
                </div>
                {!user ? (
                    <div className={styles.userLinks}>
                        <Link className={styles.navBarLink} href="/signup">
                            Sign Up
                        </Link>
                        <Link className={styles.navBarLink} href="/login">
                            Login
                        </Link>
                    </div>
                ) : (
                    <div className={styles.userLinks}>
                        {/* <span className={styles.userName}>
                                Logged in as: {user.username}
                            </span> */}
                        <span
                            className={styles.navBarLink}
                            onClick={handleLogout}
                        >
                            Logout
                        </span>
                    </div>
                )}
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
            </div>
        </div>
    );
};

export default Navbar;
