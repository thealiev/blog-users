import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const AddPost = () => {
  const { id } = useParams();
  const { isAuth } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const inputFileRef = useRef(null);
  const { t } = useTranslation('common');

  useEffect(() => {
    if (id) {
      axios.get(`posts/${id}`).then(({ data }) => {
        setTitle(data.title);
        setTags(data.tags);
        setDescription(data.description);
        setImageUrl(data.imageUrl);
      }).catch(err => console.error(err));
    }
  }, [id]);

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url || '');
    } catch (err) {
      console.error(err);
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = useCallback((value) => {
    setDescription(value);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const postData = { title, description, tags, imageUrl };
      if (id) {
        await axios.patch(`/posts/${id}`, postData);
      } else {
        await axios.post('/posts', postData);
      }
      navigate('/');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const options = useMemo(() => ({
    spellChecker: false,
    maxHeight: '400px',
    autofocus: true,
    placeholder: t('addPost.editorPlaceholder'),
    status: false,
    autosave: {
      enabled: true,
      delay: 1000,
    },
  }), [t]);

  return (
    <Paper style={{ padding: 30, marginTop: 30 }}>
      <form>
        <Button variant="outlined" size="large" onClick={() => inputFileRef.current.click()}>
          {t('addPost.uploadPreview')}
        </Button>
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
        {imageUrl && (
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            {t('addPost.remove')}
          </Button>
        )}
        {imageUrl && (
          <img className={styles.image} src={`http://localhost:3002/${imageUrl}`} alt="Uploaded" />
        )}
        <br />
        <br />
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder={t('addPost.titlePlaceholder')}
          value={title}
          onChange={e => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          classes={{ root: styles.tags }}
          value={tags}
          onChange={e => setTags(e.target.value)}
          variant="standard"
          placeholder={t('addPost.tagsPlaceholder')}
          fullWidth
        />
        <SimpleMDE className={styles.editor} value={description} onChange={onChange} options={options} />
        <div className={styles.buttons}>
          <Button size="large" variant="contained" onClick={onSubmit} disabled={isLoading}>
            {id ? t('addPost.edit') : t('addPost.publish')}
          </Button>
          <Link to="/">
            <Button size="large">{t('addPost.cancel')}</Button>
          </Link>
        </div>
      </form>
    </Paper>
  );
};
