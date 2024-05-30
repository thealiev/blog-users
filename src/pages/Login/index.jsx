import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import styles from "./Login.module.scss";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Login = () => {
  const { isAuth } = useSelector(state => state.auth);
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
      username: "",
      email: "",
      password: "",
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
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        {t('login.loginToAccount')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          type="email"
          label={t('login.email')}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", {
            required: t('login.requiredField'),
          })}
          fullWidth
        />
        <TextField
          className={styles.field}
          type={showPassword ? "text" : "password"}
          label={t('login.password')}
          {...register("password", {
            required: t('login.requiredField'),
            minLength: {
              value: 5,
              message: t('login.passwordMinLength'),
            },
            maxLength: {
              value: 6,
              message: t('login.passwordMaxLength'),
            },
          })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
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
        <Button type="submit" size="large" variant="contained" fullWidth>
          {t('login.login')}
        </Button>
      </form>
    </Paper>
  );
};

