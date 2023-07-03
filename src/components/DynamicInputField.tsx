import React, { useState } from 'react'
import { TextField, Button, Grid, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface Field {
  name: string
  value: string
}

function DynamicInputFields({ type }: any) {
  const [fields, setFields] = useState<Field[]>([{ name: '', value: '' }])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newFields = [...fields]
    newFields[index].name = event.target.name
    newFields[index].value = event.target.value
    setFields(newFields)
  }

  const handleAddField = () => {
    const newFields = [...fields]
    newFields.push({ name: '', value: '' })
    setFields(newFields)
  }

  const handleRemoveField = (index: number) => {
    const newFields = [...fields]
    newFields.splice(index, 1)
    setFields(newFields)
  }

  return (
    <div>
      <Typography>{`${type} type fields (max 3 available)`}</Typography>
      {fields.map((field, index) => (
        <Grid spacing={2} container key={index}>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              margin="dense"
              id="collection-name"
              variant="outlined"
              label={`${type} field name`}
              value={field.name}
              onChange={(e: any) => handleChange(e, index)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              margin="dense"
              id="collection-name"
              variant="outlined"
              label="Field value"
              value={field.value}
              onChange={(e: any) => handleChange(e, index)}
            />
          </Grid>
          <Grid sx={{display: 'flex', alignItems: 'center'}} item xs={12} sm={2}>
            <Button onClick={() => handleRemoveField(index)}>
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
      ))}
      {fields.length < 3 && <Button onClick={handleAddField}>Add {type} Field</Button>}
    </div>
  )
}

export default DynamicInputFields
