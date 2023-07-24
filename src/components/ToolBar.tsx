import AddIcon from '@mui/icons-material/Add'
import { Box, Button, IconButton } from '@mui/material'
import TableRowsIcon from '@mui/icons-material/TableRows'
import GridViewIcon from '@mui/icons-material/GridView'
import { useDispatch, useSelector } from 'react-redux'
import { setIsItemTable } from '../store/dataViewReducer'

function Toolbar(props: any) {
  const { setShowModal, isOwner } = props.props
  const isItemTable = useSelector((state: any) => state.dataView.isItemTable)
  const dispatch = useDispatch()

  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end', mb: 3 }}>
      <IconButton onClick={() => dispatch(setIsItemTable())}>
        {isItemTable ? <GridViewIcon /> : <TableRowsIcon />}
      </IconButton>
      {isOwner && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowModal(true)}
        >
          Add <AddIcon />
        </Button>
      )}
    </Box>
  )
}

export default Toolbar
