import React, { useState } from 'react'
import { TextField, Button, Grid, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface Field {
  value: string
}

function DynamicInputFields({ type }: any) {
  const [fields, setFields] = useState<Field[]>([{ value: '' }])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newFields = [...fields]
    newFields[index].value = event.target.value
    setFields(newFields)
  }

  const handleAddField = () => {
    const newFields = [...fields]
    newFields.push({ value: '' })
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
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              margin="dense"
              id={`${type}-field${index}`}
              variant="outlined"
              label="Field name"
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
