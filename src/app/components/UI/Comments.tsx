import { useState } from "react";
import { createComment } from "@/services/CommentServices";
import { useAuth } from "../context/AuthContext";

const Comments = ({
  postId,
  allComments,
}: {
  postId: number;
  allComments: any[];
}) => {
  const [comments, setComments] =
    useState<{ content: string; user: { name: string; profileImg: string } }[]>(
      allComments
    );
  const [content, setContent] = useState("");
  const [showComments, setShowComments] = useState(false);
  const { user } = useAuth();

  const handleCreateComment = async () => {
    if (!content.trim()) return;

    await createComment(postId, content, localStorage.getItem("accessToken")!)
      .then((res) => {
        if (res) {
          setComments([...comments, res]); // Only update if valid
          setContent(""); // Clear input after successful comment
        }
      })
      .catch((err) => {});
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
          {/* Scrollable Comments Container */}
          <div className="max-h-60 overflow-y-auto p-2 bg-white rounded-md shadow-inner">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={index}
                  className="mb-2 p-2 border-b last:border-none flex gap-3 items-start"
                >
                  <img
                    src={"/userImg.png"}
                    alt={comment.user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <span className="font-medium text-gray-700">
                      {comment.user.name}
                    </span>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            )}
          </div>

          {/* Comment Input */}
          {user && (
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 p-2 border rounded text-gray-900"
              />
              <button
                onClick={handleCreateComment}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                ➕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
