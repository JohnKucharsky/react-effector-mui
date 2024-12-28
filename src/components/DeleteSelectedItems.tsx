import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import { IconButton, SxProps, Theme, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function DeleteSelectedItems({
  onClick,
  sx,
}: {
  onClick: () => void
  sx?: SxProps<Theme>
}) {
  const { t } = useTranslation()

  return (
    <Tooltip title={t('deleteSelected')}>
      <IconButton size={'small'} sx={sx} color={'error'} onClick={onClick}>
        <DeleteTwoToneIcon />
      </IconButton>
    </Tooltip>
  )
}
