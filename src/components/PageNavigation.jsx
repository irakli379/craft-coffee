import { Link } from "react-router-dom";
import styles from "./pageNavigation.module.css";
import { useIngredientContext } from "../ingredientContext";

export default function PageNav() {
  const { isLoggedIn } = useIngredientContext();

  return (
    // <nav>
    //   <ul>
    //     <li>
    //       <Link to={"/"}>Main Page</Link>
    //     </li>
    //     <li>
    //       <Link to={"/addCoffee"}>Add Coffee</Link>
    //     </li>
    //     <li>
    //       <Link to={"/coffeeList"}>Coffee List</Link>
    //     </li>
    //     <li>
    //       <Link to={"/addIngredient"}>Add Ingredient</Link>
    //     </li>
    //     <li>
    //       <Link to={"/ingredientList"}>Ingredients list</Link>
    //     </li>
    //   </ul>
    // </nav>
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link className={styles.link} to="/">
            Main Page
          </Link>
        </li>
        {isLoggedIn ? (
          <li className={styles.li}>
            <Link className={styles.link} to="/addCoffee">
              Add Coffee
            </Link>
          </li>
        ) : (
          ""
        )}
        <li className={styles.li}>
          <Link className={styles.link} to="/coffeeList">
            Coffee List
          </Link>
        </li>
        {isLoggedIn ? (
          <li className={styles.li}>
            <Link className={styles.link} to="/addIngredient">
              Add Ingredient
            </Link>
          </li>
        ) : (
          ""
        )}
        <li className={styles.li}>
          <Link className={styles.link} to="/ingredientList">
            Ingredients List
          </Link>
        </li>
      </ul>
    </nav>
  );
}
