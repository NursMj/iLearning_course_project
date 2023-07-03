import React from 'react'
import { useDropzone } from 'react-dropzone'

const ImageUploader: React.FC = () => {
  const onDrop = (acceptedFiles: File[]) => {
    // Handle the dropped files
    console.log(acceptedFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div
      {...getRootProps()}
      style={{ border: '1px dashed gray', padding: '1rem' }}
    >
      <input {...getInputProps()} accept="image/*" />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag and drop an image or click to browse</p>
      )}
    </div>
  )
}

export default ImageUploader
