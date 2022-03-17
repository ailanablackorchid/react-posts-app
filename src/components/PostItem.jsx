import React from "react";
import { useHistory } from "react-router-dom";
import MyButton from "./UI/button/MyButton";

const PostItem = (props) => {
  const router = useHistory();
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {props.number}. {props.post.title} postID: {props.post.id}
        </strong>
        <p>{props.post.body}</p>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => router.push(`/posts/${props.post.id}`)}>
          Open
        </MyButton>

        <MyButton onClick={() => props.remove(props.post.id)}>Delete</MyButton>
      </div>
    </div>
  );
};

export default PostItem;
