import { createContext, useContext, useEffect, useState } from "react";

const IngredientContext = createContext();

function isValidNumber(value) {
  const number = Number(value);
  return !isNaN(number) && isFinite(number);
}

function IngredientProvider({ children }) {
  function useLocalStorage(key, fallback) {
    const [isLoggedIn, setIsLoggedIn] = useState(
      localStorage.getItem(key) ?? fallback
    );

    useEffect(
      function () {
        localStorage.setItem(key, isLoggedIn);
      },
      [key, isLoggedIn]
    );

    return [isLoggedIn, setIsLoggedIn];
  }

  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("logged", false);

  const [ingName, setIngName] = useState("");
  const [ingPrice, setIngPrice] = useState("");
  const [ingDescription, setIngDescription] = useState("");
  const [isVegan, setIsVegan] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ingredient, setIngredient] = useState([]);

  //   function onAddIngredient(ingName, ingPrice, ingDescription) {
  //     fetch("/api/v1/adminPanel", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  //       },
  //       body: JSON.stringify([{ ingName, ingPrice, ingDescription }]),
  //     })
  //       .then((res) => {
  //         if (!res.ok) throw new Error("Somethyng went wrong.");
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setIngState((type) => [
  //           { ingName: data.items[0].ingName, id: data.items[0]._uuid },
  //           ...type,
  //         ]);
  //       })
  //       .catch((error) => console.log(error));
  //   }

  function onAddIngredient(Name, Price, Description, isVegan) {
    //if one of the fields is empty do nothing
    if (!Name || !Price || !Description) {
      alert("Fill all of the fields");
      return;
    } else if (!isValidNumber(Price)) {
      alert("The Price must be a valid number");
      return;
    }

    // if ingredient is already there do nothing
    if (ingredient.map((cur) => cur.Name).includes(Name)) {
      alert("alredy there");
      return;
    }

    fetch("/api/v1/adminPanel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify([{ Name, Price, Description, isVegan }]),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Somethyng went wrong.");
        return res.json();
      })
      .then((data) => {
        setIngredient((prev) => {
          return [
            {
              Name: data.items[0].Name,
              Price: data.items[0].Price,
              Description: data.items[0].Description,
              isVegan: data.items[0].isVegan,
              id: data.items[0]._uuid,
            },
            ...prev,
          ];
        });
      })
      .catch((error) => console.log(error));
  }

  function onGetIngredient() {
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
        setIngredient(
          data.items
            .filter((item) => item.Name)
            .map((ingr) => {
              return {
                Name: ingr.Name,
                Price: ingr.Price,
                Description: ingr.Description,
                isVegan: ingr.isVegan,
                id: ingr._uuid,
              };
            })
        )
      )
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  return (
    <IngredientContext.Provider
      value={{
        onAddIngredient,
        ingredient,
        ingName,
        ingPrice,
        ingDescription,
        setIngName,
        setIngDescription,
        setIngPrice,
        onGetIngredient,
        isLoading,
        setIsLoading,
        isVegan,
        setIsVegan,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </IngredientContext.Provider>
  );
}

function useIngredientContext() {
  const context = useContext(IngredientContext);

  if (context === undefined)
    throw new Error("context used outside the Provider");

  return context;
}

export { useIngredientContext, IngredientProvider };
