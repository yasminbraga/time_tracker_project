import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { api } from "../../services/api";

import styles from "./styles.module.scss";

type CategoriesType = {
  id: string;
  title: string;
};

export function CreateTask() {
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [category, setCategory] = useState("");
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    api.get("getCategories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  let handleSelectCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault();

    await api.post("task", { hours, date, category });
  };

  return (
    <div className={styles.boxWrapper}>
      <h2>Atualizar Task</h2>
      <form onSubmit={handleSubmitForm}>
        <div className={styles.formField}>
          <label htmlFor="hour-field">Quantidade de horas</label>
          <input
            type="number"
            name="hours"
            placeholder="Quantas horas?"
            id="hour-field"
            onChange={(e) => setHours(e.target.value)}
            value={hours}
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="date-field">Data</label>
          <input
            type="date"
            name="date"
            id="date-field"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="category-field">Categoria</label>
          <select onChange={handleSelectCategory} id="category-field">
            <option value="Selecione">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <button className={styles.formButton} type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
