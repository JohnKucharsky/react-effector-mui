import { Box, Tooltip } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'

export default function PickDateUI({
  handleChange,
  error,
  value,
  fullWidth,
  width = '16rem',
  title,
  disabled,
}: {
  handleChange: (d: Date | null) => void
  error: string
  value: Date | null
  fullWidth?: boolean
  width?: string
  title: string
  disabled?: boolean
}) {
  return (
    <Tooltip title={error}>
      <Box>
        <DesktopDatePicker
          disabled={disabled}
          value={value}
          views={['year', 'month', 'day']}
          label={title}
          onChange={(newValue) => handleChange(newValue)}
          slotProps={{
            textField: {
              size: 'small',
              fullWidth: fullWidth,
              sx: {
                width: fullWidth ? undefined : width,
                backgroundColor: (theme) => theme.palette.background.default,
                borderRadius: '12px',
              },
              error: Boolean(error),
            },
          }}
        />
      </Box>
    </Tooltip>
  )
}
