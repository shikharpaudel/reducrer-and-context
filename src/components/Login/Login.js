import React, { useState, useEffect, useReducer,useContext } from "react";
import AuthProvider from "../store/auth-provider";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/input/input";
const reducerEmail = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const reducerPassword = (state,action)=>{
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
}
const Login = (props) => {
  const ctx = useContext(AuthProvider);
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState("");
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(reducerEmail, {
    value: "",
    isValid: undefined,
  });
  const[passwordState,dispatchPassword] = useReducer(reducerPassword,{value:'',isValid:undefined})

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);
const {isValid:emailIsValid}=emailState;
const {isValid:passwordIsValid}=passwordState;
  useEffect(() => {
     const identifier = setTimeout(() => {
       console.log('Checking form validity!');
       setFormIsValid(
         emailIsValid && passwordIsValid
       );
     }, 500);

     return () => {
       console.log('CLEANUP');
       clearTimeout(identifier);
     };
   }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      event.target.value.includes("@") && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:"USER_INPUT",val:event.target.value})

    //setFormIsValid(
      //emailState.value.includes("@") && event.target.value.trim().length > 6
    //);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:"INPUT_BLUR"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        isValid={emailIsValid}
        label = "E-Mail"
        type = "email"
        id = "email"
        value = {emailState.value}
        onChange={emailChangeHandler}
        onBlur = {validateEmailHandler}
        />
       <Input
        isValid={passwordIsValid}
        label = "Password"
        type = "password"
        id = "password"
        value = {passwordState.value}
        onChange={passwordChangeHandler}
        onBlur = {validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
