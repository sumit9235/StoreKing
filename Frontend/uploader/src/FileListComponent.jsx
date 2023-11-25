import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileListComponent = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:4500/data/files');
        setFiles(response.data.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h2>File List</h2>
      <ul>
        {files.map((file) => (
          <li key={file.filename}>
            {file.filename} - {new Date(file.uploadDate).toLocaleString()} - {file.userInformation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileListComponent;
