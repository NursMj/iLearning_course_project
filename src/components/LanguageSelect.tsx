import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'

interface MyObject {
  [key: string]: { title: string }
}

const locales: MyObject = {
  en: { title: 'En' },
  ru: { title: 'Ru' },
}

function LanguageSelect() {
  const { i18n } = useTranslation()

  return (
    <Box sx={{ minWidth: 80 }}>
      <ButtonGroup
        disableElevation
        variant="contained"
        aria-label="Disabled elevation buttons"
      >
        {Object.keys(locales).map((l) => (
          <Button
            size="small"
            style={{
              backgroundColor:
                i18n.resolvedLanguage === l ? '#fff' : 'transparent',
              color:
                i18n.resolvedLanguage === l ? '#444' : '',
            }}
            key={l}
            color="primary"
            onClick={() => i18n.changeLanguage(l)}
          >
            {locales[l].title}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  )
}

export default LanguageSelect
