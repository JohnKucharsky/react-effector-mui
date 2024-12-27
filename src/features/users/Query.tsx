import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'
import { InputAdornment, TextField } from '@mui/material'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import { usersStore } from '@/features/users/data/store'

export default function Query() {
  const [handleQueryChange, query] = useUnit([
    usersStore.handleQueryChangeEv,
    usersStore.$query,
  ])

  const { t } = useTranslation()

  return (
    <TextField
      sx={{
        maxWidth: '20rem',
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          ),
        },
      }}
      onChange={(e) => handleQueryChange(e.target.value)}
      placeholder={t('Search')}
      value={query}
      size="small"
      fullWidth
      variant="outlined"
    />
  )
}
