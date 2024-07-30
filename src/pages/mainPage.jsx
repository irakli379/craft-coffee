import { Link } from "react-router-dom";
import PageNav from "../components/PageNavigation";
import { useIngredientContext } from "../ingredientContext";
import styles from "./mainPage.module.css";
import CurrencyConverter from "../currencyConverter";

function MainPage() {
  const { setIsLoggedIn, isLoggedIn } = useIngredientContext();

  return (
    <div>
      <PageNav />
      <div className={styles.container}>
        <h1 className={styles.heading}>Welcome to Coffee-Craft</h1>
        <p className={styles.subheading}>You can order a coffee here</p>
        <p className={styles.infoText}>
          If you want to create your own coffee and ingredients, please log in
        </p>
        <button
          onClick={() => setIsLoggedIn((cur) => !cur)}
          className={styles.loginButton}
        >
          {isLoggedIn ? "Log out" : "Log in"}
        </button>
      </div>
      {/* <CurrencyConverter /> */}
    </div>
  );
}

export default MainPage;
