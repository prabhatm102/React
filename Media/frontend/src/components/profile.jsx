import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import auth from "../services/authService";
import { getPosts, deletePost } from "../services/postService";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";

import PostsCard from "./postsCard";
import PostForm from "./postForm";
import ProfileHeader from "./profileHeader";

const MySwal = withReactContent(Swal);

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [toggleComments, setToggleComments] = useState("none");
  const handleComment = (post) => {
    let display;
    if (toggleComments === "none") display = "block";
    else display = "none";
    setToggleComments(display);
  };
  const handleEdit = async (post) => {};
  const handleDelete = async (post) => {
    const allPosts = [...posts];
    try {
      //Sweet Alert...............
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        setPosts(allPosts.filter((p) => p._id !== post._id));
        await deletePost(post);
        Swal.fire("Deleted!", "Post has been deleted.", "success");
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error("Post has already been deleted!");
      setPosts(allPosts);
    }
  };
  useEffect(() => {
    const allPosts = async () => {
      const { data } = await getPosts();
      setPosts(data);
    };
    if (Object.keys(posts).length === 0) allPosts();
  }, [posts]);

  const user = auth.getCurrentUser();
  if (!user) return <Redirect to="/signin" />;
  return (
    <div className="container-fluid shadow p-3 mb-5 bg-body rounded">
      <ProfileHeader user={user} />

      <PostForm user={user} posts={posts} setPosts={setPosts} />

      <PostsCard
        posts={posts}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onComment={handleComment}
        toggleComments={toggleComments}
      />
    </div>
  );
};

export default Profile;
