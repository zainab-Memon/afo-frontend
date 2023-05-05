import axios from "axios";

// function to get all comments
export const CommentsGetApi = async () => {
  try {
    const mainOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      "http://54.221.169.56:3005/api/comments/get-general-content-comments/64521482be5cf0a618303824",
      mainOptions
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Main Slider Response");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error, "Error Coming from Main Slider function");
  }
};

// function to add comment
export async function addComment(comment, user_id, id) {
  const url =
    "http://54.221.169.56:3005/api/comments/add-comment/64521482be5cf0a618303824";
  const commentData = {
    comment: comment,
    user_id: "642e75f120f2c12c8731a39f",
  };

  try {
    const response = await axios.post(url, commentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("cd", commentData);
    const data = response.data;
    console.log("Comment successfully added:", data);
    return data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}

// function to update comment
export async function updateComment(generalContentId, commentId, comment) {
  const url = `http://54.221.169.56:3005/api/comments/update-comment/${generalContentId}/${commentId}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// function to delete comment
export async function deleteComment(generalContentId, commentId) {
  axios
    .delete(
      `http://54.221.169.56:3005/api/comments/delete-comment/${generalContentId}/${commentId}`
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}
// updateComment(123, 456, "This is an updated comment")
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));

// Delete Comment
// DELETE http://54.221.169.56:3005/api/comments/delete-comment/{general-content-id}/{comment-id}

// Update Comment
// PUT http://54.221.169.56:3005/api/comments/update-comment/{general-content-id}/{comment-id}
// {
//     "updatedComment":"testing comment update"
// }
