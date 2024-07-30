import { useNavigate, useParams } from "react-router-dom";
import { useIngredientContext } from "../../ingredientContext";
import { useEffect, useState } from "react";
import PageNav from "../../components/PageNavigation";
import styles from "./updateIngredient.module.css";

function isValidNumber(value) {
  const number = Number(value);
  return !isNaN(number) && isFinite(number);
}

export default function UpdateIngredient() {
  const navigate = useNavigate();

  const { setIsLoading, isLoading } = useIngredientContext();

  const { ingredientId } = useParams();

  const [curIngredient, setCurIngredient] = useState({
    Name: "",
    Description: "",
    Price: "",
    isVegan: "",
  });

  function onGetIngredientId() {
    setIsLoading(true);
    fetch(`/api/v1/adminPanel/${ingredientId}`, {
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
        console.log(data);
        setCurIngredient({
          Name: data.Name,
          Description: data.Description,
          Price: data.Price,
          Id: data._uuid,
          isVegan: data.isVegan,
        });
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  useEffect(function () {
    onGetIngredientId();
  }, []);

  function onUpdateIngredient(ingredient) {
    fetch(`/api/v1/adminPanel/${ingredientId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({
        Name: ingredient.Name,
        Price: ingredient.Price,
        Description: ingredient.Description,
        isVegan: ingredient.isVegan,
      }),
    })
      .then(() => navigate("/ingredientList"))
      .catch((error) => console.log(error));
  }

  function handleUpdateIngredient(e) {
    e.preventDefault();
    onUpdateIngredient(curIngredient);
  }

  // useEffect(function () {
  //   onGetIngredientId();
  //   console.log(curIngredient);
  // }, []);

  return (
    <>
      <PageNav />
      <form onSubmit={handleUpdateIngredient} className={styles.formCard}>
        <label htmlFor="ingredientName" className={styles.label}>
          Ingredient Name:
        </label>
        <input
          type="text"
          id="ingredientName"
          className={styles.input}
          value={curIngredient.Name}
          onChange={(e) =>
            setCurIngredient((prev) => ({ ...prev, Name: e.target.value }))
          }
        />

        <label htmlFor="ingredientPrice" className={styles.label}>
          Ingredient Price:
        </label>
        <input
          type="text"
          id="ingredientPrice"
          className={styles.input}
          value={curIngredient.Price}
          onChange={(e) =>
            setCurIngredient((prev) => {
              if (!isValidNumber(e.target.value)) {
                alert("Enter a valid number");
                return prev;
              }
              return { ...prev, Price: e.target.value };
            })
          }
        />

        <label htmlFor="ingredientDescription" className={styles.label}>
          Ingredient Description:
        </label>
        <input
          type="text"
          id="ingredientDescription"
          className={styles.input}
          value={curIngredient.Description}
          onChange={(e) =>
            setCurIngredient((prev) => ({
              ...prev,
              Description: e.target.value,
            }))
          }
        />

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="isVegan"
            className={styles.checkboxInput}
            checked={curIngredient.isVegan}
            onChange={(e) =>
              setCurIngredient((prev) => ({
                ...prev,
                isVegan: e.target.checked,
              }))
            }
          />
          <label htmlFor="isVegan" className={styles.checkboxLabel}>
            Vegan
          </label>
        </div>

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </>
  );
}
