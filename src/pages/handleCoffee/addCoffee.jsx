import { useEffect } from "react";
import { useCoffeeContext } from "../../coffeeContext";
import PageNav from "../../components/PageNavigation";
import { useIngredientContext } from "../../ingredientContext";
import { useNavigate } from "react-router-dom";
import styles from "./addCoffee.module.css";

export default function AddCoffee() {
  const navigate = useNavigate();

  const {
    handleAddCoffee,
    coffeeName,
    setCoffeeName,
    coffeeIngredients,
    setCoffeeIngredients,
  } = useCoffeeContext();
  const { onGetIngredient, ingredient } = useIngredientContext();

  useEffect(function () {
    onGetIngredient();
  }, []);

  function handleAddIngr(e, item) {
    e.preventDefault();
    setCoffeeIngredients((prev) => [
      { Name: item.Name, Price: item.Price },
      ...prev,
    ]);
  }

  return (
    <div>
      <PageNav />

      <form
        className={styles.formContainer}
        onSubmit={(e) => {
          handleAddCoffee(e);
          navigate("/coffeeList");
        }}
      >
        <label htmlFor="name" className={styles.label}>
          Coffee Name:{" "}
        </label>
        <input
          type="text"
          id="name"
          placeholder="Latte"
          value={coffeeName}
          onChange={(e) => setCoffeeName(e.target.value)}
          className={styles.inputField}
        />
        <div className={styles.ingredientList}>
          {ingredient.map((item) => (
            <div key={item.id} className={styles.ingredientItem}>
              <span>
                {item.Name} || {item.Price} || {item.Description} ||{" "}
                {item.isVegan ? "Vegan" : "Not Vegan"}
              </span>
              <button
                onClick={(e) => handleAddIngr(e, item)}
                className={styles.ingredientButton}
              >
                Add ingredient to the coffee
              </button>
            </div>
          ))}
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
