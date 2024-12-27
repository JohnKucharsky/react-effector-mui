import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, IconButton, Stack, Tooltip, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function CardControls({
  handleEditOpen,
  handleOpenConfirmDelete,
  blocked,
  square,
}: {
  handleEditOpen?: () => void
  handleOpenConfirmDelete?: () => void
  blocked?: boolean
  square?: boolean
}) {
  const theme = useTheme()

  const borderRadius = square ? '0.5rem' : '50%'

  const { t } = useTranslation()

  return (
    <>
      <Stack direction={'row'} alignItems={'center'} gap={0.5}>
        {handleEditOpen ? (
          <Tooltip title={t('Edit')}>
            <IconButton
              sx={{
                borderRadius,
                backgroundColor: theme.palette.background.default,
              }}
              size={'small'}
              onClick={handleEditOpen}
            >
              <EditOutlinedIcon
                sx={{ fill: theme.palette.info.light }}
                fontSize="small"
              />
            </IconButton>
          </Tooltip>
        ) : null}
        {handleOpenConfirmDelete && (
          <Tooltip title={t('Delete')}>
            <Box>
              <IconButton
                sx={{
                  borderRadius,
                  backgroundColor: theme.palette.background.default,
                }}
                size={'small'}
                disabled={blocked}
                onClick={!blocked ? handleOpenConfirmDelete : undefined}
              >
                {/*<RiDeleteBin6Line style={{ fill: deleteColor }} />*/}
              </IconButton>
            </Box>
          </Tooltip>
        )}
      </Stack>
    </>
  )
}
