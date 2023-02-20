import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import createComment from "../api/createComment";
import useGetComment from "../api/useGetComment";
import moment from "moment";
import "moment/locale/zh-tw";

function Comment(props) {
  const [comment, setComment] = useState([]);
  const [show, setShow] = useState(false);
  const [commentKeeper, setCommentKeeper] = useState("");

  useGetComment(props.id, setComment);
  function showSubmitCommentHandler() {
    setShow(true);
  }
  function hideSubmitCommentHandler() {
    setShow(false);
  }
  function submitHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    setCommentKeeper("");
    hideSubmitCommentHandler();
    createComment({ comment: commentKeeper, itemId: props.id });
    //強制reload重新使元件mount 並重新獲取資料(試過在原hook內內置一個hook使其重新fetch data但可能速度太快跟新不到最新的資料)
    window.location.reload();
  }
  return (
    <div className="w-75">
      {!show ? (
        <div className="mt-1 d-flex flex-row justify-content-between align-items-center">
          <div>使用者評論</div>
          {props.isLogin ? (
            <Button onClick={showSubmitCommentHandler}>增加評論</Button>
          ) : null}
        </div>
      ) : (
        <div className="my-2">
          <Form onSubmit={submitHandler}>
            <InputGroup>
              <Form.Control
                type="text"
                aria-label="With textarea"
                placeholder="請輸入評論"
                autoFocus
                onBlur={hideSubmitCommentHandler}
                value={commentKeeper}
                onChange={(e) => {
                  if (e.target.value.length > 20) return;
                  setCommentKeeper(e.target.value.trim(""));
                }}
              />
            </InputGroup>
          </Form>
        </div>
      )}
      {comment.length > 0 ? (
        comment.map((el) => {
          return (
            <div
              className="w-75 d-flex flex-row justify-content-between w-100"
              key={el._id}
            >
              <span>{el?.comment}</span>
              <div className="text-right">
                <span>{el.user.name}</span>
                <span className="mx-2">
                  {moment(el.createdAt).format("LLL")}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center">現在沒有評論</div>
      )}
    </div>
  );
}

export default Comment;
