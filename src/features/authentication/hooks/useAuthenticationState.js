import { useState } from 'react';

export default function useAuthenticationState() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return { username, password, setUsername, setPassword };
}