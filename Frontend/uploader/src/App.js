import './App.css';
import FileDeleteComponent from './FileDeleteComponent';
import FileListComponent from './FileListComponent';
import FileUploadComponent from './FileUploadComponent';
import LoginComponent from './LoginComponent';
import SignupComponent from './SignUpComponent';

function App() {
  return (
    <div className="App">
      <SignupComponent/>
      <></>
      <LoginComponent/>
      <></>
      <FileUploadComponent/>
      <></>
      <FileListComponent/>
      <></>
      <FileDeleteComponent/>
    </div>
  );
}

export default App;
