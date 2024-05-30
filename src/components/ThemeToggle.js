import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Tooltip } from "@mui/material";
import { toggleTheme } from "../redux/slices/theme";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const ThemeToggle = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Tooltip
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <Button onClick={handleToggle}>
        {theme === "light" ? <IoMdMoon size={25} /> : <IoMdSunny size={25} />}
      </Button>
    </Tooltip>
  );
};

export default ThemeToggle;
