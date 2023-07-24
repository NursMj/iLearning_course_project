import AddIcon from '@mui/icons-material/Add'
import { Box, Button, IconButton } from '@mui/material'
import TableRowsIcon from '@mui/icons-material/TableRows'
import GridViewIcon from '@mui/icons-material/GridView'
import { useDispatch, useSelector } from 'react-redux'
import { setIsItemTable } from '../store/dataViewReducer'
import GetAppIcon from '@mui/icons-material/GetApp'
import downloadCSV from '../utils/downloadCSV'

function Toolbar(props: any) {
  const {
    setShowModal,
    isOwner,
    exportData,
    showDataView = false,
  } = props.props
  const isItemTable = useSelector((state: any) => state.dataView.isItemTable)
  const dispatch = useDispatch()
  const dataToExport = useSelector((state: any) => state.items.items.toExport)
  const handleExport = () => {
    if (dataToExport.length === 0) return
    downloadCSV(dataToExport, dataToExport[0].collection)
  }

  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end', mb: 3 }}>
      {showDataView && (
        <IconButton onClick={() => dispatch(setIsItemTable())}>
          {isItemTable ? <GridViewIcon /> : <TableRowsIcon />}
        </IconButton>
      )}
      {exportData && (
        <Button variant="outlined" color="primary" onClick={handleExport}>
          Export csv <GetAppIcon />
        </Button>
      )}
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
