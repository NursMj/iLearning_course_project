import { Button } from 'react-bootstrap'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'

function Toolbar({ handleBlockAndUnblock, handleDelete }: any) {

  return (
    <div className="toolbar mb-3">
      <Button
        className="me-3"
        variant="success"
        onClick={() => handleBlockAndUnblock('blocked')}
      >
        <AddIcon />
      </Button>
      <Button
        className="me-3"
        onClick={() => handleBlockAndUnblock('unblocked')}
      >
        <EditIcon />
      </Button>
      <Button className="me-3" variant="danger" onClick={handleDelete}>
        <DeleteIcon />
      </Button>
    </div>
  )
}

export default Toolbar
