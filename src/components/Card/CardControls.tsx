import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function CardControls({
  handleEditOpen,
  handleOpenConfirmDelete,
}: {
  handleEditOpen?: () => void
  handleOpenConfirmDelete?: () => void
}) {
  const { t } = useTranslation()

  return (
    <>
      <Stack direction={'row'} alignItems={'center'} gap={0.5}>
        {handleEditOpen ? (
          <Tooltip title={t('Edit')}>
            <IconButton
              color={'secondary'}
              size={'small'}
              onClick={handleEditOpen}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : null}
        {handleOpenConfirmDelete && (
          <Tooltip title={t('Delete')}>
            <IconButton
              color={'error'}
              size={'small'}
              onClick={handleOpenConfirmDelete}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </>
  )
}
