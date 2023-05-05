import React, { useState, useEffect } from "react";
import { Col, Image, Row, Button } from "react-bootstrap";
import { CommentsGetApi, deleteComment } from "../Services/commentsApi";

const commentsData = [
  {
    _id: 1,
    user_Id: 1,
    name: "Maria Samantha",
    date: "June 29 2023",
    message:
      "It is a long established fact that a reader will be distracted by content of the movie.",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    isEdit: false,
  },
  {
    _id: 2,
    user_Id: 1,
    name: "Maria Samantha",
    date: "June 29 2023",
    message:
      "It is a long established fact that a reader will be distracted by content of the movie. long established fact that a reader will be distracted by",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    isEdit: false,
  },
  {
    _id: 3,
    user_Id: 1,
    name: "Maria Samantha",
    date: "June 29 2023",
    message: "Nice movie.",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    isEdit: false,
  },
  {
    _id: 4,
    user_id: 2,
    name: "Maria Samantha",
    date: "June 29 2023",
    message: "IGood.",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    isEdit: false,
  },
  {
    _id: 5,
    user_Id: 2,
    name: "Maria Samantha",
    date: "June 29 2023",
    message: "Wow! what a great movie.",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    isEdit: false,
  },
  {
    _id: 6,
    user_Id: 2,
    name: "Maria Samantha",
    date: "June 29 2023",
    message: "IGood.",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    isEdit: false,
  },
  {
    _id: 7,
    user_Id: 2,
    name: "Maria Samantha",
    date: "June 29 2023",
    message:
      "It is a long established fact that a reader will be distracted by content of the movie. long established fact that a reader will be distracted by",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    isEdit: false,
  },
  {
    _id: 8,
    user_Id: 1,
    name: "Maria Samantha",
    date: "June 29 2023",
    message:
      "It is a long established fact that a reader will be distracted by content of the movie.",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    isEdit: false,
  },
  {
    _id: 9,
    user_Id: 1,
    name: "Maria Samantha",
    date: "June 29 2023",
    message:
      "It is a long established fact that a reader will be distracted by content of the movie. long established fact that a reader will be distracted by",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    isEdit: false,
  },
  {
    _id: 10,
    user_Id: 1,
    name: "Maria Samantha",
    date: "June 29 2023",
    message: "Nice movie.",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    isEdit: false,
  },
  {
    _id: 11,
    user_Id: 1,
    name: "Maria Samantha",
    date: "June 29 2023",
    message: "Nice movie.",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    isEdit: false,
  },
  {
    _id: 12,
    user_Id: 1,
    name: "Maria Samantha",
    date: "June 29 2023",
    message: "IGood.",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    isEdit: false,
  },
  {
    _id: 13,
    user_Id: 1,
    name: "Maria Samantha",
    date: "June 29 2023",
    message: "Wow! what a great movie.",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    isEdit: false,
  },
  {
    _id: 14,
    user_Id: 1,
    name: "Maria Samantha",
    date: "June 29 2023",
    message:
      "It is a long established fact that a reader will be distracted by content of the movie. long established fact that a reader will be distracted by",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    isEdit: false,
  },
  {
    _id: 15,
    user_Id: 1,
    name: "Maria Samantha",
    date: "June 29 2023",
    message: "Nice movie.",
    avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    isEdit: false,
  },
];
export default function Comments({ generalContentId }) {
  const [noOfComments, setNoOfComments] = useState(5);
  const [comments, setComments] = useState(commentsData);
  const [editingComment, setEditingComment] = useState("");
  const [commentss, setCommentss] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newComment, setNewComment] = useState(commentss.comment);

  const currentUserId = "642e75f120f2c12c8731a39f";
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setNewComment(commentss.comment);
  };

  const handleSaveClick = () => {
    fetch(
      `http://54.221.169.56:3005/api/comments/64521482be5cf0a618303824/6453bb927b5c51091fe33981`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: newComment }),
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(error));

    setEditing(false);
  };

  const handleDelete = (id) => {
    deleteComment(generalContentId, id);
  };

  //   const handleEditClick = (comment, index) => {
  //     commentsData[index]["isEdit"] = true;
  //     setEditingComment(comment.message);
  //   };

  const updateComment = (newMessage) => {
    // console.log(newMessage);
    setEditingComment(newMessage);
  };
  //   console.log("ed", editingComment);
  const handleShowMore = () => {
    setNoOfComments(noOfComments + 5);
  };

  const handleHideComments = () => {
    if (noOfComments > 5) {
      setNoOfComments(noOfComments - 5);
    }
  };

  const handleDeleteComment = (commentId) => {
    const newCommentList = comments.filter(
      (comment) => comment._id !== commentId
    );
    setComments(newCommentList);
  };

  useEffect(() => {
    CommentsGetApi()
      .then((data) => {
        setCommentss(data.comments);
        console.log("comments", data.comments);
      })
      .catch((error) => {
        console.log(error, "Comments get error");
      });
  }, []);

  //   const ids = commentss.comments
  //     .map((obj) => (obj._id ? obj._id : null))
  //     .filter((_id) => _id !== null);

  //   console.log("ids", ids);

  return (
    <section className="">
      {/* {commentss &&
        commentss?.map((comment) => (
          <Row key={comment._id} className="py-2 comments-section-row">
            <Col md="12" lg="10" xl="8">
              <Row>
                <Col>
                  <div className="comments-section-main">
                    {editing && (
                      <div>
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button onClick={handleCancelClick}>Cancel</button>
                        <button onClick={handleSaveClick}>Save</button>
                      </div>
                    )}
                    <Image
                      className="rounded-circle shadow-1-strong me-3 comments-image"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                      alt="avatar"
                      width="65"
                      height="65"
                    />

                    <div className="flex-grow-1 flex-shrink-1 comments-section-details">
                      <div className="">
                        <div className="comment-section-title">
                          <p className="mb-1 ">Sarfaraz Ahmed</p>
                          <span className="large">{comment.createdAt}</span>
                          <p>{comment._id}</p>
                        </div>

                        <div className="comments-section-comment">
                          <p className="large mb-0">{comment.comment}</p>

                          <div>
                            {comment.user === currentUserId && !editing && (
                              <>
                                <i
                                  className="ri-delete-bin-7-fill"
                                  onClick={() => handleDelete(comment._id)}
                                ></i>
                                <i className="ri-pencil-fill"></i>
                                <Button onClick={handleEditClick}>Edit</Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        ))} */}
      <div className="d-flex justify-content-center">
        {noOfComments < commentsData.length && (
          <Button
            className="btn btn-hover iq-button py-2"
            onClick={handleShowMore}
          >
            Show more comments
          </Button>
        )}
        {noOfComments > 5 && (
          <Button
            className="btn btn-hover iq-button py-2 ml-2"
            onClick={handleHideComments}
          >
            Hide comments
          </Button>
        )}
      </div>
    </section>
  );
}
