import React, { useState } from "react";
import { Grid, TextField, useTheme, useMediaQuery } from "@mui/material";
import StyledButton from "components/misc/StyledButton";
import { searchProductsByTerm } from "api/kroger/products";
import { useDispatch, useSelector } from "react-redux";
import { titleCase } from "../../utils/titleCase";
import {
  setNewIngredientName,
  setNewIngredientProducts,
} from "redux/reducers/ingredientSlice";
import { savedIngredientsSelector } from "redux/selectors/ingredientSelectors";

const AddIngredientButtons = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [addingIngredient, setAddingIngredient] = useState(false);
  const [helperText, setHelperText] = useState("");
  const savedIngredients = useSelector(savedIngredientsSelector);

  const handleAddButtonToggle = () => {
    setAddingIngredient((previousState) => !previousState);
  };

  const handleAddIngredient = async () => {
    setHelperText("");
    if (
      !savedIngredients.some(
        (ingredient) => ingredient.name === titleCase(input)
      )
    ) {
      handleAddButtonToggle();
      dispatch(setNewIngredientName(titleCase(input)));
      const { data } = await searchProductsByTerm(input);
      dispatch(setNewIngredientProducts(data));
    } else {
      setInput("");
      setHelperText("Ingredient already exists");
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      mt="2rem"
      mb="2rem"
    >
      {addingIngredient ? (
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Grid
            item
            xs={12}
            sx={{
              width: isMobile ? "100%" : "20rem",
            }}
          >
            <TextField
              variant="outlined"
              label="Ingredient Name"
              value={input}
              helperText={helperText}
              error={helperText.length > 0}
              onFocus={() => setHelperText("")}
              sx={{
                width: isMobile ? "calc(100% - 4rem)" : "20rem", // Subtracting 2rem from both sides
                m: isMobile ? "0 2rem" : 0,
              }}
              fullWidth
              onChange={(e) => setInput(e.target.value)}
            />
          </Grid>

          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: isMobile ? "100%" : "20rem",
            }}
          >
            <Grid item justifyContent="flex-start">
              <StyledButton
                styles={{
                  width: "8rem",
                  height: "3rem",
                  ml: isMobile ? "2rem" : 0,
                }}
                label="Cancel"
                onClick={handleAddButtonToggle}
              />
            </Grid>
            <Grid item justifyContent="flex-end">
              <StyledButton
                styles={{
                  width: "8rem",
                  height: "3rem",
                  mr: isMobile ? "2rem" : "-1rem",
                }}
                label="Save"
                disabled={input.length === 0 || helperText.length > 0}
                onClick={handleAddIngredient}
              />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <StyledButton
          label="Add Ingredient"
          onClick={handleAddButtonToggle}
          styles={{
            width: isMobile ? "100%" : "20rem",
            ml: isMobile ? "2rem" : 0,
            mr: isMobile ? "2rem" : 0,
            height: "3.5rem",
            fontSize: "1.25rem",
          }}
        />
      )}
    </Grid>
  );
};

export default AddIngredientButtons;
