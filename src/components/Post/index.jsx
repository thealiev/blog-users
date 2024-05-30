import React, { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import {
  IconButton,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import {
  Clear as DeleteIcon,
  Edit as EditIcon,
  ChatBubbleOutlineOutlined as CommentIcon,
  PersonAddRounded as PersonAddRoundedIcon,
  RemoveRedEye as RemoveRedEyeIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeletePost, toggleLike } from '../../redux/slices/post';
import { addFriend } from '../../redux/slices/user';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import styles from './Post.module.scss';

export const Post = ({
  id,
  description,
  title,
  createdAt,
  imageUrl,
  author,
  commentsCount = 0,
  tags,
  viewsCount = 0,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const likesCount = useSelector((state) => state.posts.likesCount[id]) ?? 0;
  const allLikedBy = useSelector((state) => state.posts.likedBy);
  const likedBy = useMemo(() => allLikedBy?.[id] || [], [allLikedBy, id]);
  const theme = useTheme();

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(likedBy.includes(user?._id));
  }, [likedBy, user?._id]);

  const handleRemove = () => {
    dispatch(fetchDeletePost(id)).catch((error) => {
      console.error('Failed to delete post:', error);
    });
  };

  const handleAddFriend = () => {
    if (author?._id && user?._id) {
      dispatch(addFriend({ userId: user._id, friendId: author._id })).catch((error) => {
        console.error('Failed to add friend:', error);
      });
    } else {
      console.error('Author or User ID is missing', { author, user });
    }
  };

  const handleToggleLike = () => {
    if (!user?._id) {
      console.error('User ID is missing', user);
      return;
    }

    dispatch(toggleLike({ id, userId: user._id }))
      .then(() => {
        setLiked(!liked);
        console.log('Like toggled:', !liked);
      })
      .catch((error) => {
        console.error('Failed to toggle like:', error);
      });
  };


  return (
    <Card
      className={clsx(styles.root, { [styles.rootFull]: isFullPost })}
      style={{
        marginTop: 40,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      {isLoading ? (
        <PostSkeleton />
      ) : (
        <>
          {isEditable && (
            <div className={styles.editButtons}>
              <Link to={`/posts/${id}/edit`}>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton onClick={handleRemove} color="secondary">
                <DeleteIcon />
              </IconButton>
            </div>
          )}
          {!isFullPost && !isEditable && (
            <div className={styles.editButtons}>
              <IconButton onClick={handleAddFriend}>
                <PersonAddRoundedIcon color="primary" />
              </IconButton>
            </div>
          )}
          {imageUrl && (
            <img
              className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
              src={isFullPost ? `http://localhost:3002/${imageUrl}` : imageUrl}
              alt={title}
            />
          )}
          <CardContent>
            {author ? (
              <UserInfo {...author} additionalText={createdAt} />
            ) : (
              <p>Author information not available</p>
            )}
            <div className={styles.indention}>
              <Typography
                variant="h6"
                className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
              >
                {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
              </Typography>
              <Typography variant="body2">{description}</Typography>
              {tags && (
                <Box component="ul" className={styles.tags}>
                  {tags.split(',').map((name) => (
                    <li key={name}>
                      <Link to={`/tag/${name}`}>#{name}</Link>
                    </li>
                  ))}
                </Box>
              )}
              {children && <div className={styles.content}>{children}</div>}
              <Box component="ul" className={styles.postDetails}>
                <li>
                  <CommentIcon />
                  <span>{commentsCount?.toString()}</span>
                </li>
                {!isFullPost && (
                  <li>
                    <RemoveRedEyeIcon />
                    <span>{viewsCount?.toString()}</span>
                  </li>
                )}
                <li>
                  <IconButton onClick={handleToggleLike}>
                    {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                  </IconButton>
                  <span>{likesCount?.toString()}</span>
                </li>
              </Box>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};
