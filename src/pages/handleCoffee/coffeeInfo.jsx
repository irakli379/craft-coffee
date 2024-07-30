import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCoffeeContext } from "../../coffeeContext";
import PageNav from "../../components/PageNavigation";
import styles from "./coffeeInfo.module.css";
import Spinner from "../Spinner";

export default function CoffeeInfo() {
  const { setIsLoading, isLoading } = useCoffeeContext();

  const { coffeeInfo } = useParams();

  const [curCoffee, setCurCoffee] = useState({
    coffee: "",
    ingredients: [],
  });

  function onGetCoffeeId() {
    setIsLoading(true);
    fetch(`/api/v1/adminPanel/${coffeeInfo.slice(1)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Somethyng went wrong.");
        return res.json();
      })
      .then((data) => {
        setCurCoffee({
          coffee: data.coffee,
          ingredients: data.coffeeIngredients,
        });
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  useEffect(function () {
    onGetCoffeeId();
  }, []);

  let totalPrice = curCoffee.ingredients.reduce((acc, cur) => {
    return acc + Number(cur.Price);
  }, 2);

  return (
    <div>
      <PageNav />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <div className={styles.coffeeName}>{curCoffee.coffee}</div>
          <div className={styles.ingredientsList}>
            {curCoffee.ingredients.map((ing, index) => (
              <div key={index} className={styles.ingredientCard}>
                <div className={styles.ingredientName}>{ing.Name}</div>
                <div className={styles.ingredientPrice}>{ing.Price}</div>
              </div>
            ))}
          </div>
          <div className={styles.totalPrice}>
            Total price: {totalPrice}
            {" GEL"}
          </div>
        </div>
      )}
    </div>
  );
}
