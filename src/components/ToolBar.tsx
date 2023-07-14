import { Button } from 'react-bootstrap'
import AddIcon from '@mui/icons-material/Add'
// import DeleteIcon from '@mui/icons-material/Delete'
// import EditIcon from '@mui/icons-material/Edit'

function Toolbar(props: any) {
  const { setShowModal, isOwner } = props.props


  if (isOwner) return (
    <div className="toolbar mb-3">
      <Button
        className="me-3"
        variant="success"
        onClick={() => setShowModal(true)}
      >
        <AddIcon />
      </Button>
      {/* <Button
        className="me-3"
      >
        <EditIcon />
      </Button>
      <Button className="me-3" variant="danger">
        <DeleteIcon />
      </Button> */}
    </div>
  )
}

export default Toolbar
