import AppRouter from './router/AppRouter';
import { useEffect, useState, useCallback } from 'react';
import { me } from './utils';
import { usePath } from 'raviger';

function App() {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const path = usePath();

  const getCurrentUser = useCallback(async () => {
    try {
      const currUser = await me();
      setCurrentUser(currUser);
    } catch (e) {
      localStorage.removeItem('token');
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (!currentUser?.username && localStorage.getItem('token'))
      getCurrentUser();
  }, [path, currentUser, getCurrentUser]);

  return <AppRouter currentUser={currentUser} />;
}

export default App;
