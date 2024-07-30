import AddCoffee from "../pages/handleCoffee/addCoffee";
import CoffeeTypeList from "../pages/handleCoffee/coffeeTypeList";
import MainPage from "../pages/mainPage";
import UpdateCoffee from "../pages/handleCoffee/updateCoffee";
import AddIngredient from "../pages/handleIngredints/addIngredient";
import CoffeeInfo from "../pages/handleCoffee/coffeeInfo";
import IngredientList from "../pages/handleIngredints/ingredientList";
import UpdateIngredient from "../pages/handleIngredints/updateIngredient";
import IngredientInfo from "../pages/handleIngredints/ingredientInfo";

const routes = [
  {
    element: <MainPage />,
    path: "/",
  },
  {
    element: <AddCoffee />,
    path: "/addCoffee",
  },
  {
    element: <CoffeeTypeList />,
    path: "/coffeeList",
  },
  {
    element: <CoffeeInfo />,
    path: "/coffeeList/:coffeeInfo",
  },
  {
    element: <UpdateCoffee />,
    path: "/updateCoffee/:coffeeId",
  },
  {
    element: <AddIngredient />,
    path: "/addIngredient",
  },
  {
    element: <IngredientList />,
    path: "/ingredientList",
  },
  {
    element: <UpdateIngredient />,
    path: "/updateIngredient/:ingredientId",
  },
  {
    element: <IngredientInfo />,
    path: "/ingredientList/:ingredientInfo",
  },
];

export default routes;
