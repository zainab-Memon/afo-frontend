import { Row, Col, Form, Button } from "react-bootstrap";
import { addComment } from "../Services/commentsApi";
import { useState } from "react";

function AddComment({ id }) {
  const [comment, setComment] = useState("");
  const [user_id, setUser_id] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting comment:", comment, user_id);
    addComment(comment, user_id, id)
      .then((response) => {
        console.log("Comment added", response);
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
      });
  };
  return (
    <section className=" mt-5">
      <Row className="add-comment-container">
        <h4 className="mb-2">Add your comment:</h4>
        <Col xs={12}>
          <Form onSubmit={handleSubmit}>
            <Col xs={12}>
              <Form.Group controlId="comment">
                <Form.Label>Comment*</Form.Label>
                <Form.Control
                  className="bg-transparent "
                  as="textarea"
                  rows={3}
                  placeholder="Enter your comment here..."
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
              </Form.Group>
            </Col>
            {/* <Col xs={12} sm={6}>
              <Form.Group controlId="email">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-transparent"
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Group controlId="name">
                <Form.Label>Name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  className="bg-transparent"
                  onChange={(event) => setUser_id(event.target.value)}
                  value={user_id}
                />
              </Form.Group>
            </Col> */}

            <Col xs={12}>
              <Button type="submit" className="btn btn-hover iq-button py-2">
                <i className="fa fa-play mr-1" aria-hidden="true"></i>
                Submit
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </section>
  );
}

export default AddComment;
