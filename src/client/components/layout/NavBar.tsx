import {UserInfo} from "types/user";
import styles from "client/styles/NavBar.module.css";
import Link from "next/link";
import LocalSession from "client/LocalSession";

type Props = {
  user: UserInfo;
};

export default ({user}: Props) => {
  const handleLogout = () => {
    LocalSession.logout();
    window.location.reload();
  };

  const name = user?.nickName ?? user?.id;
  return (
    <nav>
      <ul className={styles.list}>
        <div>
          <li className={styles.item}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link href="/subscribed">Subscribed</Link>
          </li>
        </div>
        <div>
          {!!name && (
            <li className={styles.item}>
              <p>{name}</p>
            </li>
          )}
          {user?.points && (
            <li className={styles.item}>
              <p>Points: {user?.points}</p>
            </li>
          )}
          <li className={styles.item}>
            <button className={styles.logout} onClick={handleLogout}>
              Log out
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
};