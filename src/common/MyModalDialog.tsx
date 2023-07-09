import Dialog from '@mui/material/Dialog'

function MyModalDialog(props: any) {
  const { showModal, handleClose, modalContent } = props.props

  return (
    <Dialog open={showModal} onClose={handleClose}>
      {modalContent}
    </Dialog>
  )
}

export default MyModalDialog
