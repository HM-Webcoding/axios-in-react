export default function Posts({ posts, onEditClick, onDeletePost }) {
  return (
    <div>
      <h2>All Posts</h2>
      <div>
        {posts.map((post) => (
          <ul key={post.id}>
            <li>
              <span>{post.id}</span>
              <span> {post.title} </span>
              <div>
                <span onClick={() => onDeletePost(post.id)}>❌</span>
                <span onClick={() => onEditClick(post)}>✏️</span>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
