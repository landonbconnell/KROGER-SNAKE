import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import StyledButton from "components/misc/StyledButton";
import { useDispatch } from "react-redux";
import { addNewRecipeIngredient } from "redux/reducers/recipeSlice";

const AddRecipeIngredient = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const handleClick = () => {
    dispatch(addNewRecipeIngredient());
  };

  return (
    <StyledButton
      label="Add Ingredient"
      onClick={handleClick}
      styles={{
        width: isMobile ? "calc(100% - 4rem)" : "15rem",
        ml: isMobile ? "2rem" : 0,
        mr: isMobile ? "2rem" : 0,
        height: "3rem",
        fontSize: "1rem",
      }}
    />
  );
};

export default AddRecipeIngredient;
