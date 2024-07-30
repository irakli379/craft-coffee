// import { createContext, useEffect, useState } from "react";
// import AddIngredient from "./components/addIngredient";
// import IngredientList from "./pages/ingredientList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { CoffeeProvider } from "./coffeeContext";
import { IngredientProvider } from "./ingredientContext";
// import PageNav from "./components/PageNavigation";

function App() {
  // const API_KEY = process.env.REACT_APP_API_KEY;

  return (
    <>
      <IngredientProvider>
        <CoffeeProvider>
          <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>
        </CoffeeProvider>
      </IngredientProvider>
    </>
  );
}

export default App;
