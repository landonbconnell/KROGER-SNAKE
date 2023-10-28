import React, { useState } from "react";
import { Grid, IconButton } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import SelectIngredient from "./SelectIngredient";
import SetQuantity from "./SetQuantity";
import SelectUnit from "./SelectUnit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { newRecipeSelector } from "redux/selectors/recipeSelectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeNewRecipeIngredient } from "redux/reducers/recipeSlice";

const MobileIngredient = ({ index }) => {
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const { ingredients } = useSelector(newRecipeSelector);

  const handlers = useSwipeable({
    onSwipedLeft: () => ingredients.length > 1 && setShowDelete(true),
    onSwipedRight: () => ingredients.length > 1 && setShowDelete(false),
  });

  const handleDelete = () => {
    dispatch(removeNewRecipeIngredient(index));
    setShowDelete(false);
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid
        item
        container
        {...handlers}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        xs={showDelete ? 9 : 12}
        sx={{
          // Reducing the translateX value to make it move less to the left
          transform: showDelete ? "translateX(-1rem)" : "translateX(0)",
        }}
      >
        <Grid item width={showDelete ? "100%" : "calc(100% - 4rem)"}>
          <SelectIngredient index={index} />
        </Grid>

        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          width={showDelete ? "100%" : "calc(100% - 3.5rem)"}
        >
          <Grid item xs={6}>
            <SetQuantity index={index} />
          </Grid>
          <Grid item xs={6}>
            <SelectUnit index={index} />
          </Grid>
        </Grid>
      </Grid>

      {showDelete && (
        <IconButton disableRipple edge="start" onClick={handleDelete}>
          <DeleteOutlineIcon fontSize="large" />
        </IconButton>
      )}
    </Grid>
  );
};

export default MobileIngredient;
