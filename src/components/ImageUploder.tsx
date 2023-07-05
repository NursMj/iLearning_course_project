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
      style={{ border: isDragActive ? '1px dashed #007bff'  :'1px dashed gray', padding: '2rem' }}
    >
      <input {...getInputProps()} accept="image/*" />
      {isDragActive ? (
        <p style={{color: '#007bff'}}>Drop the files here...</p>
      ) : (
        <p>Drag and drop an image or click to browse (optional)</p>
      )}
    </div>
  )
}

export default ImageUploader
