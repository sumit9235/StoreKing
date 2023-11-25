// SignupComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const SignupComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:4500/users/signup', {
        name,
        email,
        password,
      });
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
      <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default SignupComponent;

// LoginComponent.js
// (Same as the previous LoginComponent code)
