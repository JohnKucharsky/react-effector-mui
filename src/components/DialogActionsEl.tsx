import {
  Button,
  CircularProgress,
  DialogActions,
  FormHelperText,
} from '@mui/material'

export default function DialogActionsEl({
  submit,
  isSubmitting,
  buttonTitle,
  center,
}: {
  submit: string | null | undefined
  isSubmitting: boolean
  buttonTitle: string
  center?: boolean
}) {
  return (
    <DialogActions
      sx={{
        pt: 0.5,
        pb: 2,
        px: { xs: 1, md: 2 },
        justifyContent: center ? 'center' : 'flex-start',
      }}
    >
      {submit ? (
        <FormHelperText error>{JSON.stringify(submit)}</FormHelperText>
      ) : null}
      <Button
        type="submit"
        startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
        disabled={Boolean(submit) || isSubmitting}
        variant="contained"
        size={'small'}
      >
        {buttonTitle}
      </Button>
    </DialogActions>
  )
}
