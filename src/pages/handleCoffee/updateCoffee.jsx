import { useNavigate, useParams } from "react-router-dom";
import PageNav from "../../components/PageNavigation";
import { useCoffeeContext } from "../../coffeeContext";
import { useEffect, useState } from "react";
import styles from "./updateCoffee.module.css";

export default function UpdateCoffee() {
  const { setIsLoading, isLoading } = useCoffeeContext();
  const navigate = useNavigate();

  const [curCoffee, setCurCoffee] = useState("");

  const { coffeeId } = useParams();

  function onGetCoffeeId() {
    setIsLoading(true);
    fetch(`/api/v1/adminPanel/${coffeeId.slice(1)}`, {
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
      .then((data) => setCurCoffee(data.coffee))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  function onUpdateCoffee(coffee) {
    fetch(`/api/v1/adminPanel/${coffeeId.slice(1)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({ coffee }),
    })
      .then(() => navigate("/coffeeList"))
      .catch((error) => console.log(error));
  }

  function handleUpdateCoffee(e) {
    e.preventDefault();
    onUpdateCoffee(curCoffee);
  }

  useEffect(function () {
    onGetCoffeeId();
  }, []);

  return (
    <div>
      <PageNav />
      <>
        <form className={styles.formContainer} onSubmit={handleUpdateCoffee}>
          <label htmlFor="name" className={styles.label}>
            Coffee Name:{" "}
          </label>
          <input
            type="text"
            id="name"
            placeholder="Latte"
            value={curCoffee}
            onChange={(e) => setCurCoffee(e.target.value)}
            className={styles.inputField}
          />
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </>
    </div>
  );
}
