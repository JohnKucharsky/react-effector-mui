import { type FC } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Dialog, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ButtonError, Transition } from './StyledComponents/ConfirmDeleteStyles'
import AbsoluteWrapper from '@/components/AbsoluteWrapper'

const ConfirmDeleteUI: FC<{
  openConfirmDelete: boolean
  closeConfirmDelete: () => void
  handleDeleteCompleted: () => Promise<void>
  deleteWarningText: string
  deleteTitle?: string
}> = ({
  openConfirmDelete,
  closeConfirmDelete,
  handleDeleteCompleted,
  deleteWarningText,
  deleteTitle,
}) => {
  const { t } = useTranslation()

  return (
    <Dialog
      open={openConfirmDelete}
      maxWidth="xs"
      fullWidth
      TransitionComponent={Transition}
      keepMounted
      onClose={closeConfirmDelete}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        p={2}
      >
        <AbsoluteWrapper topInHalfRem={1} rightInHalfRem={1}>
          <IconButton onClick={closeConfirmDelete} size="small">
            <CloseIcon />
          </IconButton>
        </AbsoluteWrapper>
        <Typography
          sx={{
            mb: 3,
            pr: 2,
          }}
          variant="h4"
        >
          {deleteWarningText}
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          sx={{ mb: 1 }}
          onClick={closeConfirmDelete}
        >
          {t('Cancel')}
        </Button>
        <ButtonError
          onClick={handleDeleteCompleted}
          fullWidth
          variant="contained"
        >
          {deleteTitle ? t(deleteTitle as any, {}) : t('Delete')}
        </ButtonError>
      </Box>
    </Dialog>
  )
}

export default ConfirmDeleteUI
