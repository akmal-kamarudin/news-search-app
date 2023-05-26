import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNewsCrud } from "../context/NewsCrudContext";
import { Grid, TextField, Button, Chip, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { deepOrange } from "@mui/material/colors";

const Header = () => {
  const { handleSetKeyword, keyWord } = useNewsCrud();

  const LOCAL_STORAGE_KEY1 = "isLoggedIn";
  const LOCAL_STORAGE_KEY2 = "userName";

  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY1)) ?? false
  );
  const [userName, setUserName] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY2)) ?? ""
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY1, JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(userName));
  }, [userName]);

  const [search, setSearch] = useState(keyWord);

  if (!isLoggedIn) return <Navigate to="/"></Navigate>;

  // Logout button
  const logoutHandler = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    setUserName("");
  };

  // Search button
  const getSearchTerm = (e) => {
    e.preventDefault();
    handleSetKeyword(search);
    setSearch("");
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "center", sm: "center" }}
        justifyContent={{ xs: "space-evenly", sm: "space-between" }}
      >
        <Grid sx={{ ml: 2 }}>
          <Typography
            variant="h4"
            color={deepOrange[500]}
            sx={{ fontStyle: "italic", fontWeight: "bold" }}
          >
            Today's News
          </Typography>
        </Grid>
        <Grid sx={{ m: 1 }}>
          <form onSubmit={getSearchTerm}>
            <TextField
              focused
              color="warning"
              label="Search for News"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mr: 1, width: { xs: "auto", sm: "auto", md: "auto", lg: "50ch" } }}
            />
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              type="submit"
              sx={{
                width: "12ch",
                textTransform: "capitalize",
              }}
            >
              Search
            </Button>
          </form>
        </Grid>
        <Grid sx={{ mr: 2 }}>
          <Chip icon={<FaceIcon />} label={userName} color="secondary" />
          <Button
            variant="contained"
            size="small"
            type="submit"
            color="warning"
            sx={{
              ml: 1,
              width: "3ch",
              textTransform: "capitalize",
            }}
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
