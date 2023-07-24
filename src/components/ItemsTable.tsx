import { Typography, useMediaQuery, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'

export default function DataTable({
  columns,
  rows,
  error,
  MOBILE_COLUMNS,
  ALL_COLUMNS,
}: any) {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const [columnVisible, setColumnVisible] = useState(ALL_COLUMNS)

  useEffect(() => {
    const newColumns = matches ? ALL_COLUMNS : MOBILE_COLUMNS
    setColumnVisible(newColumns)
  }, [matches])

  if (error)
    return <Typography variant="h6">{error}. Faild to fetch data.</Typography>

  if (rows.length === 0)
    return <Typography variant="h6">Looks like it is empty here</Typography>
  return (
    <div style={{ height: 'auto', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        columnVisibilityModel={columnVisible}
        disableColumnSelector
        disableDensitySelector
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </div>
  )
}
