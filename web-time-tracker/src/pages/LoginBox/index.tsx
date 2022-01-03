import { useContext } from "react";
import { VscGithubInverted } from "react-icons/vsc";

import { AuthContext } from "../../contexts/auth";
import styles from "./styles.module.scss";

import timeImg from "../../assets/time.svg";

export function LoginBox() {
  const { signInUrl } = useContext(AuthContext);

  return (
    <div className={styles.loginBoxWrapper}>
      <h2>Time Tracker</h2>
      <img src={timeImg} alt="time image" className={styles.timeImage} />
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size="20" />
        Entrar com Github
      </a>
    </div>
  );
}
