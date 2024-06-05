import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Box, Select, MenuItem, FormControl } from '@mui/material';
import { logout } from '../../redux/slices/auth';
import ThemeToggle from '../ThemeToggle';
import styles from './Header.module.scss';
import SearchInput from '../SearchInput';
import CreateTicketButton from '../jira/CreateTicketButton';

export const Header = () => {
  const { t, i18n } = useTranslation('common');
  const { isAuth } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(logout());
  };

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box className={styles.root}>
      <Container maxWidth="lg">
        <Box className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Book</div>
          </Link>
          <SearchInput />
          <Box className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/create-post">
                  <Button variant="outlined">{t('header.writeArticle')}</Button>
                </Link>
                <Button onClick={onClickLogout} variant="outlined" color="error">
                  {t('header.logout')}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">{t('header.login')}</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">{t('header.createAccount')}</Button>
                </Link>
              </>
            )}   
            <FormControl sx={{ m: 1, minWidth: 50 }} size="small">
              <Select
                sx={{color: 'blue'}}
              value={i18n.language}
              onChange={changeLanguage}
              variant="outlined"
                className={styles.languageSelect}
                inputProps={{ disableUnderline: true }}
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="ru">RU</MenuItem>
            </Select>
            </FormControl>
            <ThemeToggle />
            <CreateTicketButton/>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
