import React from "react";
import AuthForm from "./AuthForm";

const Login = ({ onSubmit }) => {

  return (
      <main className="auth">
        <section className="auth__container">
          <h2 className="auth__title">
            Вход
          </h2>
          <AuthForm buttonText="Войти" onSubmit={ onSubmit }/>
        </section>
      </main>
  )
}

export default Login;