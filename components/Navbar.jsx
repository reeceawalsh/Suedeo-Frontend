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
            <div className={styles.navContainer}>
                <div className={styles.navLeft}>
                    <Image
                        id="logo"
                        className={styles.logo}
                        src={logo}
                        alt="Suedeo Logo"
                    />
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
                    <span>
                        {!user && (
                            <div className={styles.right}>
                                <Link href="/signup">Sign Up</Link>
                                <Link href="/login">Login</Link>
                            </div>
                        )}
                    </span>
                    {/* Dropdown Profile Menu */}
                    {user && (
                        <div className={styles.right}>
                            {/* <span className={styles.userName}>
                                Logged in as: {user.username}
                            </span> */}
                            <span
                                className={styles.logout}
                                onClick={handleLogout}
                            >
                                Logout
                            </span>
                        </div>
                    )}
                    {/* {user && (
                        <div className={styles.right}>
                            <span className={styles.userName}>
                                {user.username}
                            </span>
                            <div
                                className={styles.dropdown}
                                onMouseEnter={() => setDropdownVisible(true)}
                                onMouseLeave={() => setDropdownVisible(false)}
                            >
                                <Image
                                    id="profile-img"
                                    className={styles.profile}
                                    src={userIcon}
                                    alt="Profile Pic"
                                />
                                <div className={styles.profile}>
                                    <div className={styles.icon} />
                                    {dropdownVisible && (
                                        <div className={styles.dropdownContent}>
                                            <span>Settings</span>
                                            <span onClick={handleLogout}>
                                                Logout
                                            </span>
                                        </div>
                                    )} */}
                    {/* </div>
                            </div>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
