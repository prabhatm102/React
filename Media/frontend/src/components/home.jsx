import React, { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import PostForm from "./postForm";
import PostsCard from "./postsCard";

const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [toggleComments, setToggleComments] = useState("none");
  const handleComment = (post) => {
    let display;
    if (toggleComments === "none") display = "block";
    else display = "none";
    setToggleComments(display);
  };
  useEffect(() => {
    const allPosts = async () => {
      const { data } = await getAllPosts();
      setPosts(data);
    };
    allPosts();
  }, []);

  return (
    <div className="container-fluid shadow p-3 mb-5 bg-body rounded">
      {!user && <p className="alert alert-danger text-center">Login To Post</p>}
      {user && <PostForm user={user} posts={posts} setPosts={setPosts} />}
      <PostsCard
        posts={posts}
        setPosts={setPosts}
        onComment={handleComment}
        toggleComments={toggleComments}
      />
    </div>
  );
};

export default Home;
