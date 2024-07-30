import { useEffect } from "react";
import { useIngredientContext } from "../../ingredientContext";
import PageNav from "../../components/PageNavigation";
import { Link } from "react-router-dom";
import styles from "./ingredientList.module.css";
import Spinner from "../Spinner";

export default function IngredientList() {
  const { onGetIngredient, ingredient, isLoading, isLoggedIn } =
    useIngredientContext();

  useEffect(function () {
    onGetIngredient();
  }, []);

  function deleteIngredient(ingredient) {
    fetch(`/api/v1/adminPanel/${ingredient}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    }).then(() => onGetIngredient());
  }

  return (
    <div>
      <PageNav />
      {isLoading ? (
        <Spinner />
      ) : (
        ingredient.map((item) => {
          return (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardDetails}>
                <div>
                  Name: {item.Name} | Price: {item.Price} | Description:{" "}
                  {item.Description} | {item.isVegan ? "Vegan" : "Not Vegan"}
                </div>
                <div>
                  {isLoggedIn ? (
                    <Link
                      className={styles.link}
                      to={`/updateIngredient/${item.id}`}
                    >
                      Update Ingredient
                    </Link>
                  ) : (
                    ""
                  )}
                  <Link
                    className={styles.link}
                    to={`/ingredientList/${item.id}`}
                  >
                    See Info
                  </Link>
                  {isLoggedIn ? (
                    <button
                      className={styles.button}
                      onClick={() => deleteIngredient(item.id)}
                    >
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
