import { Button } from 'react-bootstrap'
import AddIcon from '@mui/icons-material/Add'
import { Box } from '@mui/material'

function Toolbar(props: any) {
  const { setShowModal, isOwner } = props.props


  if (isOwner) return (
    <Box sx={{display: 'flex', justifyContent: 'end', mb: 3}}>
      <Button
        variant="success"
        onClick={() => setShowModal(true)}
      >
        Add <AddIcon />
      </Button>
    </Box>
  )
}

export default Toolbar
