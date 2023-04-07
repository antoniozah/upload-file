import logo from './logo.svg';
import './App.css';
import UploadFiles from './containers/UploadFiles';

function App() {
  return (
    <div className="app">
      <header className="header">
        Upload Files App
      </header>
      <section>
        <UploadFiles />
      </section>
      <footer>
        <p>Antonios Zachos</p>
      </footer>
    </div>
  );
}

export default App;
