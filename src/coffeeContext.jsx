import { createContext, useContext, useState } from "react";

const CoffeeContext = createContext();

function CoffeeProvider({ children }) {
  const [coffeeName, setCoffeeName] = useState("");
  const [coffeeIngredients, setCoffeeIngredients] = useState([]);
  const [coffeeType, setCoffeeType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function onAddCoffee(coffee) {
    fetch("/api/v1/adminPanel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify([{ coffee, coffeeIngredients }]),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Somethyng went wrong.");
        return res.json();
      })
      .then((data) => {
        setCoffeeType((type) => [
          {
            coffee: data.items[0].coffee,
            id: data.items[0]._uuid,
            coffeeIngs: data.items[0].coffeeIngredients,
          },
          ...type,
        ]);
      })
      .catch((error) => console.log(error));
  }

  function onGetCoffee() {
    setIsLoading(true);
    fetch("/api/v1/adminPanel", {
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
      .then((data) =>
        setCoffeeType(
          data.items
            .filter((item) => item.coffee)
            .map((cf) => {
              return {
                coffee: cf.coffee,
                id: cf._uuid,
                ingredients: cf.coffeeIngredients,
              };
            })
        )
      )
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  function handleAddCoffee(e) {
    e.preventDefault();
    onAddCoffee(coffeeName);
    setCoffeeName("");
  }

  return (
    <CoffeeContext.Provider
      value={{
        coffeeName,
        onAddCoffee,
        onGetCoffee,
        handleAddCoffee,
        coffeeType,
        setCoffeeName,
        isLoading,
        setIsLoading,
        coffeeIngredients,
        setCoffeeIngredients,
      }}
    >
      {children}
    </CoffeeContext.Provider>
  );
}

function useCoffeeContext() {
  const context = useContext(CoffeeContext);

  if (context === undefined)
    throw new Error("context used outside the Provider");

  return context;
}

export { useCoffeeContext, CoffeeProvider };
