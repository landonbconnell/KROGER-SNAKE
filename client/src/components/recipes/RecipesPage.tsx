import React, { useState } from "react";
import Header from "components/Header";

import { Box } from "@mui/material";
import AddRecipeButton from "./AddRecipeButton";
import NewRecipe from "./NewRecipe";

const RecipesPage = () => {
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "secondary.main",
        overflowX: "hidden",
      }}
    >
      <Header />
      {isAddingRecipe ? (
        <NewRecipe />
      ) : (
        <AddRecipeButton setIsAddingRecipe={setIsAddingRecipe} />
      )}
    </Box>
  );
};

export default RecipesPage;
