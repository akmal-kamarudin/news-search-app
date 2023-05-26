import React from "react";
import { useNewsCrud } from "../context/NewsCrudContext";
import {
  Grid,
  Divider,
  Button,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

const MyFavPanel = () => {
  const { myFav, clearMyFav } = useNewsCrud();

  // Display Fav list
  const renderFavItem = myFav.map((favItem, index) => {
    return (
      <React.Fragment key={index}>
        <ListItem disablePadding>
          <ListItemButton href={favItem.url} target="_blank" component="a">
            <Typography variant="h6" color={grey[50]}>
              <ListItemText primary={favItem.title} />
            </Typography>
          </ListItemButton>
        </ListItem>
        <Divider variant="fullWidth" color={grey[50]} />
      </React.Fragment>
    );
  });

  // Clear button
  const deleteHandler = () => {
    clearMyFav();
  };

  return (
    <>
      <Divider variant="fullWidth" color={grey[50]} />
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        <Divider orientation="vertical" variant="fullWidth" />
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid sx={{ m: 2 }}>
            <Typography variant="h6" color={grey[50]} sx={{ fontWeight: "normal" }}>
              My Favourites: {myFav.length}
            </Typography>
          </Grid>
          <Button
            variant="contained"
            size="small"
            type="submit"
            color="warning"
            onClick={deleteHandler}
            sx={{
              m: 1,
              width: "3ch",
              textTransform: "capitalize",
            }}
          >
            Clear
          </Button>
        </Grid>
        <Box>
          <List style={{ backgroundColor: "background.paper" }}>
            <Divider variant="fullWidth" color={grey[50]} />
            {renderFavItem}
          </List>
        </Box>
      </Grid>
    </>
  );
};

export default MyFavPanel;
