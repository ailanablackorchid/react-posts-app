import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import MyLoader from "../components/UI/loader/MyLoader";

const PostIDPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostByID, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getByID(id);
    setPost(response.data);
  });

  const [fetchComments, isCommentsLoading, comError] = useFetching(
    async (id) => {
      const response = await PostService.getCommentsByPostID(id);
      setComments(response.data);
    }
  );

  useEffect(() => {
    fetchPostByID(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div className="posts">
      <h1 className="post-page-padding">Post page! ID = {params.id}</h1>

      {isLoading ? (
        <MyLoader />
      ) : (
        <div className="post-page-padding post-page">
          <strong>
            {post.title} postID: {params.id}
          </strong>
          <p>{post.body}</p>
        </div>
      )}
      <h3>Comments</h3>
      {isCommentsLoading ? (
        <MyLoader />
      ) : (
        <div className="post-page-padding">
          {comments.map((comm) => (
            <div className="post-page-padding-little" key={comm.id}>
              <h4>{comm.name}</h4>
              <h5>{comm.email}</h5>
              <p>{comm.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIDPage;
