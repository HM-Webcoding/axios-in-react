import { useEffect, useState } from "react";
import "./App.css";
import AddPost from "./Component/Addpost.jsx";
import EditPost from "./Component/EditPost.jsx";
import Posts from "./Component/Posts";
import api from "./api/api.js";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  const handleAddPost = async (newPost) => {
    try {
      const nextId = Number(posts[posts.length - 1].id) + 1;

      const finalPost = {
        id: nextId.toString(),
        ...newPost,
      };

      const response = await api.post("/posts", finalPost);

      setPosts([...posts, finalPost]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditePost = async (updatePost) => {
    try {
      const response = await api.patch(`/posts/${updatePost.id}`, updatePost);
      console.log(response.data);
      const updatedPost = posts.map((post) => {
        return post.id == response.data.id ? response.data : post;
      });

      setPosts(updatedPost);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      if (confirm("are you sure you want to delete this item")) {
        await api.delete(`/posts/${id}`);
        const filtered = posts.filter((post) => post.id != id && post);
        setPosts(filtered);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchingPosts = async () => {
      try {
        const response = await api.get("/posts");

        if (response && response.data) {
          setPosts(response.data);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchingPosts();
  }, []);

  return (
    <div>
      <div>
        <h1>API Request with api</h1>
        <hr />

        <div>
          <Posts
            posts={posts}
            onEditClick={setPost}
            onDeletePost={handleDeletePost}
          />

          <hr />
          {post ? (
            <EditPost post={post} onEditPost={handleEditePost} />
          ) : (
            <AddPost onAdd={handleAddPost} />
          )}

          {error && (
            <>
              <hr />
              <div className="error">{error}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
