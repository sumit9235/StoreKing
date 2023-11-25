import React, { useState } from 'react';
import axios from 'axios';

const FileUploadComponent = () => {
  const [file, setFile] = useState(null);
  const [userInformation, setUserInformation] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUserInformationChange = (e) => {
    setUserInformation(e.target.value);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userInformation', userInformation);
      let token=localStorage.getItem("token")
      await axios.post('http://localhost:4500/data/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization":token
        },
      });

      // Optionally, you can update the state or show a success message
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error (show an error message or log it)
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="User Information"
        value={userInformation}
        onChange={handleUserInformationChange}
      />
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  );
};

export default FileUploadComponent;
