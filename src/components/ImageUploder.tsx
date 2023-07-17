import { IconButton, Paper } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import DeleteIcon from '@mui/icons-material/Delete'

const ImageUploader = ({file, setFile}: any) => {
  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      {!file ? (
        <div
          {...getRootProps()}
          style={{
            border: isDragActive ? '1px dashed #007bff' : '1px dashed gray',
            padding: '2rem',
          }}
        >
          <>
            <input {...getInputProps()} accept="image/*" />
            {isDragActive ? (
              <p style={{ color: '#007bff' }}>Drop the files here...</p>
            ) : (
              <p>Drag and drop an image or click to browse (optional)</p>
            )}
          </>
        </div>
      ) : (
        <Paper
          sx={{
            p: 1,
            pl: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>Image uploaded: {file.name}</div>
          <IconButton onClick={()=> setFile(null)}>
            <DeleteIcon />
          </IconButton>
        </Paper>
      )}
    </>
  )
}

export default ImageUploader
