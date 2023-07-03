// import { useState } from 'react'
import { Typography } from '@mui/material'
import ItemsList from '../components/ItemsList'
import Toolbar from '../components/ToolBar'
import { useTranslation } from 'react-i18next'
// import MyModalDialog from '../components/MyModalDialog'

function UserPage() {
  const { t } = useTranslation()
  const collectionData = [
    { id: 1, title: 'collection1' },
    { id: 2, title: 'collection2' },
    { id: 3, title: 'collection3' },
    { id: 4, title: 'collection4' },
    { id: 5, title: 'collection5' },
  ]

  // const modalContent = (
  //   <span>From user page</span>
  // )

  function setShowModal() {
    
  }

  return (
    <>
      <Typography variant="h4" className="mb-3">
        {t('user.title')}
      </Typography>
      <Toolbar props={{ setShowModal }} />
      <ItemsList data={collectionData} type="collection" />
      {/* <MyModalDialog /> */}
    </>
  )
}

export default UserPage
