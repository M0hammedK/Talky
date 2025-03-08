import { useState } from "react";
import { createComment } from "@/services/CommentServices";
import { useAuth } from "../context/AuthContext";

const Comments = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<
    { content: string; author: { name: string; profileImg: string } }[]
  >([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const {user} = useAuth()
  const handleCreateComment = async () => {
    if (!newComment.trim()) return;

    try {
      const createdComment = await createComment(postId, newComment);

      if (createdComment) {
        setComments([...comments, createdComment]); // Only update if valid
        setNewComment(""); // Clear input after successful comment
      } else {
        alert("Failed to add comment");
      }
    } catch (err) {
      console.error("Comment creation error:", err);
    }
  };

  return (
    <div className="px-6 py-4">
      <button
        onClick={() => setShowComments(!showComments)}
        className="text-blue-600 hover:text-blue-800 transition duration-300 text-sm"
      >
        {showComments ? "Hide comments" : "Show comments"}
      </button>

      {showComments && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div
                key={index}
                className="mb-2 p-2 bg-white rounded-md shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={comment.author.profileImg}
                    alt={comment.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium text-gray-700">
                    {comment.author.name}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}
          {/* Comment Input */}
          <div className="mt-4 flex gap-2" hidden={!user ? true : false}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={handleCreateComment}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              ➕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
