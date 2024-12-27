import DangerousIcon from '@mui/icons-material/Dangerous'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import { IconButton, SxProps, Theme, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function DeleteSelectedItems({
  onClick,
  title,
  all,
  sx,
}: {
  onClick: () => void
  title?: string
  all?: boolean
  sx?: SxProps<Theme>
}) {
  const { t } = useTranslation()

  return (
    <Tooltip title={title || t('deleteSelected')}>
      <IconButton size={'small'} sx={sx} color={'error'} onClick={onClick}>
        {all ? <DangerousIcon /> : <DeleteTwoToneIcon />}
      </IconButton>
    </Tooltip>
  )
}
