import React, { useState } from 'react';
import axios from 'axios';

const FileDeleteComponent = () => {
  const [fileName, setFileName] = useState('');

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleFileDelete = async () => {
    try {
      await axios.delete(`http://localhost:4500/data/deleteFile/${fileName}`);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="File Name to Delete"
        value={fileName}
        onChange={handleFileNameChange}
      />
      <button onClick={handleFileDelete}>Delete File</button>
    </div>
  );
};

export default FileDeleteComponent;
