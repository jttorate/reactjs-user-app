import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import styles from "./AddUser.module.css";

const AddUser = (props) => {
  /** State */
  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();
  /** Refs */
  const usernameInputRef = useRef();
  const ageInputRef = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty values)."
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age (> 0)."
      });
      return;
    }

    props.onAddUser(enteredUsername, enteredAge);
    /** State */
    // setEnteredUsername("");
    // setEnteredAge("");
    /** Refs */
    usernameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  // const usernameChangeHandler = (event) => {
  //   /** State */
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   /** State */
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  /** JSX */
  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={usernameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );

  /** Array - Need to add "key" props */
  // return [
  //   error && (
  //     <ErrorModal
  //       key="error-modal"
  //       title={error.title}
  //       message={error.message}
  //       onConfirm={errorHandler}
  //     />
  //   ),
  //   <Card key="add-user-card" className={styles.input}>
  //     <form onSubmit={addUserHandler}>
  //       <label htmlFor="username">Username</label>
  //       <input
  //         id="username"
  //         type="text"
  //         value={enteredUsername}
  //         onChange={usernameChangeHandler}
  //       />
  //       <label htmlFor="age">Age (Years)</label>
  //       <input
  //         id="age"
  //         type="number"
  //         value={enteredAge}
  //         onChange={ageChangeHandler}
  //       />
  //       <Button type="submit">Add User</Button>
  //     </form>
  //   </Card>
  // ];
};

export default AddUser;
