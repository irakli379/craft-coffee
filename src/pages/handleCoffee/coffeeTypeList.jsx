import { useEffect } from "react";
import { useCoffeeContext } from "../../coffeeContext";
import PageNav from "../../components/PageNavigation";
import { Link } from "react-router-dom";
import styles from "./coffeeTypeList.module.css";
import Spinner from "../Spinner";
import { useIngredientContext } from "../../ingredientContext";

export default function CoffeeTypeList() {
  const { coffeeType, onGetCoffee, isLoading } = useCoffeeContext();
  const { isLoggedIn } = useIngredientContext();

  useEffect(function () {
    onGetCoffee();
  }, []);

  function deleteCoffee(coffee) {
    fetch(`/api/v1/adminPanel/${coffee}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    }).then(() => onGetCoffee());
  }

  return (
    <div>
      <PageNav />
      {isLoading ? (
        <Spinner />
      ) : (
        coffeeType.map((cf) => (
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <h3 className={styles.cardHeader}>{cf.coffee}</h3>
              <div className={styles.cardLinks}>
                {isLoggedIn ? (
                  <Link
                    to={`/updateCoffee/:${cf.id}`}
                    className={styles.cardLink}
                  >
                    Update Coffee
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.cardLinks}>
                <Link to={`/coffeeList/:${cf.id}`} className={styles.cardLink}>
                  See Info
                </Link>
              </div>
              {isLoggedIn ? (
                <button
                  onClick={() => deleteCoffee(cf.id)}
                  className={styles.button}
                >
                  Delete
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
