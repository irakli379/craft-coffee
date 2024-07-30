import { useParams } from "react-router-dom";
import { useIngredientContext } from "../../ingredientContext";
import { useEffect, useState } from "react";
import PageNav from "../../components/PageNavigation";
import styles from "./ingredientInfo.module.css";
import { FaLeaf, FaDollarSign, FaInfoCircle } from "react-icons/fa";
import Spinner from "../Spinner";

export default function IngredientInfo() {
  const { setIsLoading, isLoading } = useIngredientContext();

  const { ingredientInfo } = useParams();

  const [curIngredient, setCurIngredient] = useState("");

  function onGetIngredientId() {
    setIsLoading(true);
    fetch(`/api/v1/adminPanel/${ingredientInfo}`, {
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
    console.log(curIngredient);
  }, []);

  return (
    <div>
      <PageNav />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FaInfoCircle className={styles.icon} />
              {curIngredient.Name}
            </div>
            <div className={styles.cardContent}>
              <FaLeaf className={styles.icon} />
              <span>Description:</span> {curIngredient.Description}
            </div>
            <div className={styles.cardContent}>
              <FaDollarSign className={styles.icon} />
              <span>Price:</span> {curIngredient.Price}
            </div>
            <div className={styles.cardContent}>
              <FaLeaf className={styles.icon} />
              <span>Vegan:</span> {curIngredient.isVegan ? "Yes" : "No"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
