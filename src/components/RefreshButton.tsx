import SyncIcon from '@mui/icons-material/Sync'
import { Box, IconButton, Tooltip } from '@mui/material'
import { Effect, EventCallable } from 'effector'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'

export default function RefreshButton({
  refreshEv,
  effectForLoading,
}: {
  refreshEv: EventCallable<any>
  effectForLoading: Effect<any, any, any>
}) {
  const [refresh, loading] = useUnit([refreshEv, effectForLoading.pending])
  const { t } = useTranslation()

  return (
    <Tooltip title={t('Refresh')}>
      <Box>
        <IconButton disabled={loading} onClick={refresh}>
          <SyncIcon
            fontSize="small"
            sx={{ fill: (theme) => theme.palette.info.dark }}
          />
        </IconButton>
      </Box>
    </Tooltip>
  )
}
