import logo from './logo.svg';
import './App.css';
import router from './routes/Route';
import { RouterProvider } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <RouterProvider router={router}> </RouterProvider>
    </div>
  );
}

export default App;
