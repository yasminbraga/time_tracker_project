import styles from "./styles.module.scss";

interface TaskCardInterface {
  title: string;
  color: string;
  src: string;
  hours: number;
}

export function TaskCard(props: TaskCardInterface) {
  return (
    <div
      className={styles.cardDecoration}
      style={{
        backgroundColor: `${props.color}`,
        backgroundImage: `url(${props.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top right",
      }}
    >
      <div className={styles.cardContent}>
        <div>
          <h4>{props.title}</h4>
          <span>...</span>
        </div>

        <h1>{props.hours}hrs</h1>
        <span>Last Week - 36hrs</span>
      </div>
    </div>
  );
}
