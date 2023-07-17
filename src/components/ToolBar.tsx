import { Button } from 'react-bootstrap'
import AddIcon from '@mui/icons-material/Add'
import { Box } from '@mui/material'
// import DeleteIcon from '@mui/icons-material/Delete'
// import EditIcon from '@mui/icons-material/Edit'

function Toolbar(props: any) {
  const { setShowModal, isOwner } = props.props


  if (isOwner) return (
    <Box sx={{display: 'flex', justifyContent: 'end'}}>
      <Button
        className="me-3"
        variant="success"
        onClick={() => setShowModal(true)}
      >
        Add <AddIcon />
      </Button>
      {/* <Button
        className="me-3"
      >
        <EditIcon />
      </Button>
      <Button className="me-3" variant="danger">
        <DeleteIcon />
      </Button> */}
    </Box>
  )
}

export default Toolbar
