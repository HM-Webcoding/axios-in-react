import { useState } from "react";

export default function AddPost({ onAdd }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmint = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      body: message,
    };

    onAdd(newPost);

    // reset input value

    setTitle(""), setMessage("");
  };

  return (
    <div>
      <h2>Add new post</h2>

      <form onSubmit={handleSubmint}>
        <p>
          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>

        <p>
          <input
            type="text"
            placeholder="Post body"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </p>

        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}
