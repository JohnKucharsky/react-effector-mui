import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import { Checkbox, FormControlLabel } from '@mui/material'

export default function CheckboxEl({
  name,
  value,
  setFieldValue,
  label,
  disabled,
}: {
  name: string
  value: boolean
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean,
  ) => void
  label: string
  disabled?: boolean
}) {
  return (
    <FormControlLabel
      disabled={disabled}
      name={name}
      sx={{
        marginRight: 0,
        '.MuiTypography-root': { fontWeight: 500 },
      }}
      control={
        <Checkbox
          sx={{
            padding: '0.4rem',
          }}
          checkedIcon={<CheckBoxOutlinedIcon />}
          checked={value}
          onChange={(event) => setFieldValue(name, event.target.checked)}
          color="primary"
        />
      }
      label={label}
    />
  )
}
