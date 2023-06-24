import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "./styles/footer.module.css";
import NavLink from "./NavLink";

// footer which sits at the bottom of the page and contains a feedback survey and about link, and also a github link to the repo.
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                {/* Users can fill out this survey to provide feedback about the application. */}
                <NavLink className={styles.link} href="/profile">
                    Profile
                </NavLink>
            </div>
            <div className={styles.info}>
                <a
                    href="https://github.com/reeceawalsh/Seudeo-Movies"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className="white-font">Suedeo Movies</span>
                </a>
                <div className={styles.githubIcon}>
                    <a
                        href="https://github.com/reeceawalsh/Seudeo-Movies"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faGithub} size="2x" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
