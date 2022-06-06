import { RouterView } from 'mobx-state-router';
import { useEffect } from 'react';
import './App.css';
import { viewMap } from './Routing/ViewMap';
import { useStore } from './Stores/StoreProvider';

const App = () => {
  const { userStore, routerStore } = useStore();

  useEffect(() => {
    if (!userStore.isLoggedIn()) {
      routerStore.goToLogin();
    }
  }, []);

  return (
    <div className="App">
      <RouterView viewMap={viewMap} />
    </div>
  );
}

export default App;
