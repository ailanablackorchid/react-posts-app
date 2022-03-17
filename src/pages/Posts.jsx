import React, { useState, useEffect, useRef } from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import MyLoader from "../components/UI/loader/MyLoader";
import { usePosts } from "../hooks/usePosts.js";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/page";
import MyPagination from "../components/UI/pagination/MyPagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
  };

  const removePost = (idRemove) => {
    setPosts(posts.filter((post) => post.id !== idRemove));
  };

  return (
    <div className="posts">
      <MyButton onClick={() => fetchPosts(limit, page)}>GET POSTS</MyButton>
      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Elements on page"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 15, name: "15" },
          { value: 20, name: "20" },
          { value: 25, name: "25" },
          { value: -1, name: "ShowAll" },
        ]}
      />
      {postError && <h1 style={{ textAlign: "center" }}>Error: {postError}</h1>}
      {isPostsLoading && <MyLoader />}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title={"Posts"}
      />
      <div ref={lastElement}></div>
      <MyPagination
        totalPages={totalPages}
        changePage={changePage}
        page={page}
      />
    </div>
  );
}

export default Posts;
