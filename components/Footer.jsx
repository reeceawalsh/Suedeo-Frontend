import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "./styles/footer.module.css";
import NavLink from "./NavLink";

// footer which sits at the bottom of the page and contains a feedback survey and about link, and also a github link to the repo.
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <a
                href="https://github.com/reeceawalsh/Seudeo-Movies"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className="white-font">Reece Walsh</span>
            </a>
            <div className={styles.githubIcon}>
                <a
                    href="https://github.com/reeceawalsh/Suedeo-Frontend"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
