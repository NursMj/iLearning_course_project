import { DataGrid } from '@mui/x-data-grid'

export default function DataTable({columns, rows}: any) {
  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        // checkboxSelection
      />
    </div>
  )
}
