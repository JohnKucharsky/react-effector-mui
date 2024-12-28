import { LoadingButton } from '@mui/lab'
import { DialogActions, FormHelperText } from '@mui/material'

export default function DialogActionsEl({
  submit,
  isSubmitting,
  buttonTitle,
}: {
  submit: string | null | undefined
  isSubmitting: boolean
  buttonTitle: string
}) {
  return (
    <DialogActions
      sx={{
        px: { xs: 1, md: 2 },
        pb: 2,
        justifyContent: 'flex-start',
      }}
    >
      {submit ? (
        <FormHelperText error>{JSON.stringify(submit)}</FormHelperText>
      ) : null}
      <LoadingButton
        type="submit"
        loading={isSubmitting}
        disabled={Boolean(submit) || isSubmitting}
        variant="contained"
      >
        {buttonTitle}
      </LoadingButton>
    </DialogActions>
  )
}
