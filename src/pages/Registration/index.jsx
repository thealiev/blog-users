import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import styles from "./Login.module.scss";

export const Registration = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation('common');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: ""
    },
    mode: "onBlur",
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    dispatch(fetchUserData(data));
    reset();
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        {t('registration.createAccount')} 
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField
          className={styles.field}
          label={t('registration.username')}
          {...register("username", {
            required: t('registration.requiredField'),
            minLength: {
              value: 2,
              message: t('registration.usernameMinLength'),
            },
          })}
          error={Boolean(errors.username?.message)}
          helperText={errors.username?.message}
          fullWidth />
        <TextField
          className={styles.field}
          label={t('registration.email')}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", {
            required: t('registration.requiredField')
          })}
          fullWidth />
        <TextField
          className={styles.field}
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: t('registration.requiredField'),
            maxLength: {
              value: 6,
              message: t('registration.passwordMaxLength'),
            },
          })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          label={t('registration.password')}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? t('login.hidePassword') : t('login.showPassword')}
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button size="large" type="submit" variant="contained" fullWidth>
          {t('registration.register')}
        </Button>
      </form>
    </Paper>
  );
};
