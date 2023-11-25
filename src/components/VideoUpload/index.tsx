// VideoUploadComponent.tsx

import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

interface VideoUploadComponentProps {}

const VideoUploadComponent: React.FC<VideoUploadComponentProps> = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    // Load previous upload progress from local storage
    const previousProgress = localStorage.getItem('uploadProgress');
    if (previousProgress) {
      setUploadProgress(parseInt(previousProgress, 10));
    }
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      const sliceSize = 1024 * 1024; // 1MB
      const totalSlices = Math.ceil(selectedFile.size / sliceSize);
      let currentSlice = 0;

      const uploadSlice = async (start, end) => {
        const slice = selectedFile.slice(start, end);
        const formData = new FormData();
        formData.append('video', slice);
        formData.append('totalSlices', totalSlices);
        formData.append('currentSlice', currentSlice);

        // Adjust the API endpoint based on your backend configuration
        const response = await axios.post('http://localhost:3001/upload-slice', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Upload successful:', response.data);

        if (currentSlice < totalSlices - 1) {
          currentSlice++;
          const nextStart = end;
          const nextEnd = Math.min(end + sliceSize, selectedFile.size);
          uploadSlice(nextStart, nextEnd);
        }
      };

      uploadSlice(0, sliceSize);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>{`Upload Progress: ${uploadProgress}%`}</div>
    </div>
  );
};

export default VideoUploadComponent;
