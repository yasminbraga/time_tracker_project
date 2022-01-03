import { useContext, useEffect, useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";
import { TaskCard } from "../../components/TaskCard";

import styles from "./styles.module.scss";

import { api } from "../../services/api";

export function Dashboard() {
  const { user, signOut } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const location = useLocation();

  useEffect(() => {
    // const queryParams = new URLSearchParams(location.search);
    // console.log(queryParams);
    api.get("dashboard").then((response) => {
      setTasks(response.data);
    });
  }, []);

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.profileNavigation}>
        <div className={styles.profileInfo}>
          <img src={user?.avatar_url} alt="jeremy" />

          <span>Report for</span>
          <h1>{user?.name}</h1>
          <div className={styles.profileMenu}>
            <Link to="/task/create">Atualizar task</Link>
            <button onClick={signOut} className={styles.signOutButton}>
              <VscSignOut size="22" />
            </button>
          </div>
        </div>
        <div className={styles.navLinks}>
          <Link to="/dashboard?period=daily">Daily</Link>
          <Link to="/dashboard?period=weekly">Weekly</Link>
          <Link to="/dashboard?period=monthly">Monthly</Link>

          {/* <a href="#">Daily</a>
          <a href="#">Weekly</a>
          <a href="#">Monthly</a> */}
        </div>
      </div>

      <div className={styles.contentWrapper}>
        {tasks?.map((task) => (
          <TaskCard
            key={task.category_id}
            title={task.title}
            color={task.color}
            src={task.src}
            hours={task._sum.hours}
          />
        ))}
      </div>
    </div>
  );
}
