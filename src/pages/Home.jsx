import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import { Post } from '../components/Post';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularPosts, fetchPosts, fetchTags } from '../redux/slices/post';
import { useTranslation } from 'react-i18next';
import UserTickets from '../components/user-ticket/index';

export const Home = () => {
  const [pop, setPop] = useState(0);
  const { isLoading, posts, popularPosts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchPopularPosts());
  }, [dispatch]);

    const postList = Array.isArray(posts) ? posts : [];
  const popularPostList = Array.isArray(popularPosts) ? popularPosts : [];

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={pop}
        onChange={(e, newValue) => setPop(newValue)}
        aria-label="basic tabs example"
      >
        <Tab label={t('tabs.all')} />
        <Tab label={t('tabs.popular')} />
      </Tabs>
      <UserTickets/>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isLoading ? (
            <CircularProgress />
          ) : (
            (pop ? popularPostList : postList).map((obj, index) => (
              obj ? (
                <Post
                  key={obj._id}
                  id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl}
                  author={obj.user}
                  viewsCount={obj.viewsCount}
                  createdAt={obj.createdAt.slice(0, 10)}
                  commentsCount={obj.comments?.length || 0}
                  tags={obj.tags}
                  isEditable={obj?.user?._id === user?._id}
                />
              ) : null
            ))
          )}
        </Grid>
      </Grid>
    </>
  );
};
