import React from 'react'

const AuthForm = ({ buttonText, onSubmit }) => {

  const [ email , setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      password: password,
      email: email
    })
  }
  
  return (
    <form name="sign-in" onSubmit={ handleSubmit }>
      <fieldset className="auth__fieldset">
        <input className="auth__input" type="email" name="email" value={ email } onChange={ handleEmailChange } placeholder="Email">
        </input>
        <span className="auth__input-error"></span>
        <input className="auth__input" type="password" name="password" value={ password } onChange={ handlePasswordChange } placeholder="Пароль">
        </input>
        <span className="auth__input-error"></span>
        <button className="auth__button" type="submit">{ buttonText }</button>
      </fieldset>
    </form>
  )
}

export default AuthForm;