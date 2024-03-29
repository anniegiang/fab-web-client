import React, {
  useState,
  useContext,
  FormEvent,
  ChangeEventHandler,
  ChangeEvent
} from "react";
import styles from "client/styles/Form.module.css";
import CurrentUserContext from "client/context/CurrentUserContext";
import {POINTS} from "constants/points";

type Props = {
  handleAddComment: (comment: string) => Promise<any>;
};

const MINIMUM_COMMENT_LENGTH = 1;

export default ({handleAddComment}: Props) => {
  const {currentUser, updatePoints} = useContext(CurrentUserContext);

  const [comment, setComment] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const hasEnoughPoints =
    currentUser && currentUser.points >= POINTS.sendComment;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    handleAddComment(comment)
      .then(() => {
        setComment("");
        updatePoints &&
          currentUser &&
          updatePoints(currentUser.points - POINTS.sendComment);
      })
      .finally(() => setSubmitting(false));
  };

  const handleCommentChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => setComment(e.target.value);

  if (!hasEnoughPoints) {
    return (
      <p className={styles.notEnoughPoints}>
        {`You do not have enough points to send a comment. (${POINTS.sendComment} point).`}
      </p>
    );
  }

  const isSubmitButtonDisabled =
    !comment || comment.length < MINIMUM_COMMENT_LENGTH || submitting;

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={onSubmit}>
        <label className={styles.label}>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            className={styles.input}
            rows={7}
            cols={35}
          />
        </label>
        <input
          className={styles.submitButton}
          disabled={isSubmitButtonDisabled}
          type="submit"
          value={submitting ? "Sending..." : "Send"}
        />
      </form>
    </div>
  );
};
