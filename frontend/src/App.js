import './App.css';
import TaskManager from './TaskManager';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <TaskManager />
      </div>
    </ThemeProvider>
  );
}

export default App;
