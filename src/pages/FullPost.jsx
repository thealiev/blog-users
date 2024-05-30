import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {fetchGetComments} from '../redux/slices/comment'
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from '../api/axios'
import { useSelector } from "react-redux";
export const FullPost = () => {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [postId, setPostId] = useState('')
  const {comments} = useSelector(state => state.comment)
  const {id} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setPostId(id)
    dispatch(fetchGetComments(postId));
  }, [id, dispatch, postId])

  useEffect(() => {
    setIsLoading(true)
    axios.get(`posts/${id}`).then(({data}) => {
        setData(data)
      }).catch((err) => {
        console.log(err)
      })
    setIsLoading(false)
  }, [id])


  return (
    <>
      {isLoading?
      <Post  isLoading={true} isFullPost/>
      :
        <Post
        id={id}
        title={data.title}
        description={data.description}
          imageUrl={data.imageUrl ?`${process.env.REACT_APP_URI}${data.imageUrl}`: ''}
        user={data.user}
        createdAt={data.createdAt}
        commentsCount={comments? comments.length : 0}
        tags={data.tags}
        isFullPost
      >
      </Post>}
      <CommentsBlock
        items={comments}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
