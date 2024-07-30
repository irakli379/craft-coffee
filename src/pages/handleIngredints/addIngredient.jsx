import PageNav from "../../components/PageNavigation";
import { useIngredientContext } from "../../ingredientContext";
import { useNavigate } from "react-router-dom";
import styles from "./addIngredient.module.css";

export default function AddIngredient() {
  const navigate = useNavigate();

  const {
    onAddIngredient,
    ingName,
    ingPrice,
    ingDescription,
    setIngName,
    setIngDescription,
    setIngPrice,
    isVegan,
    setIsVegan,
  } = useIngredientContext();

  function handleAddIngredient(e) {
    e.preventDefault();
    onAddIngredient(ingName, ingPrice, ingDescription, isVegan);
    setIngName("");
    setIngDescription("");
    setIngPrice("");
    navigate("/ingredientList");
  }

  return (
    <div>
      <PageNav />
      <div className={styles.container}>
        <form onSubmit={handleAddIngredient} className={styles.formCard}>
          <label htmlFor="ingredientName" className={styles.label}>
            Ingredient Name:
          </label>
          <input
            type="text"
            id="ingredientName"
            className={styles.input}
            value={ingName}
            onChange={(e) => setIngName(e.target.value)}
          />

          <label htmlFor="ingredientPrice" className={styles.label}>
            Ingredient Price:
          </label>
          <input
            type="text"
            id="ingredientPrice"
            className={styles.input}
            value={ingPrice}
            onChange={(e) => setIngPrice(e.target.value)}
          />

          <label htmlFor="ingredientDescription" className={styles.label}>
            Ingredient Description:
          </label>
          <input
            type="text"
            id="ingredientDescription"
            className={styles.input}
            value={ingDescription}
            onChange={(e) => setIngDescription(e.target.value)}
          />

          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="isVegan"
              className={styles.checkboxInput}
              checked={isVegan}
              onChange={(e) => setIsVegan(e.target.checked)}
            />
            <label htmlFor="isVegan" className={styles.checkboxLabel}>
              Vegan
            </label>
          </div>

          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
