import React, { useState } from "react";
import { useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { fetchCreateComment } from '../../redux/slices/comment'
import { useTranslation } from 'react-i18next';
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const Index = () => {
  const [comment, setComment] = useState('');
  const {id} = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth)
  const { t } = useTranslation('common');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const {username, avatarUrl} = user
      const postId = id
      dispatch(fetchCreateComment({postId, comment, username, avatarUrl} ))
      setComment('')    
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={styles.root}>
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <TextField
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              label={t('comment.inputComment') }
              variant="outlined"
              maxRows={10}
              multiline
              fullWidth
            />
            <Button variant="contained" type="submit">{t('comment.send') }</Button>
          </div>
        </form>
      </div>
    </>
  );
};
