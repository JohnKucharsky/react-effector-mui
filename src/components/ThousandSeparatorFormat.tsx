import { forwardRef } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

const ThousandSeparatorFormat = forwardRef<
  NumericFormatProps,
  {
    onChange: (event: { target: { name: string; value: string } }) => void
    name: string
  }
>(function ThousandSeparatorFormat(props, ref) {
  const { onChange, ...other } = props

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: other.name || '',
            value: values.value,
          },
        })
      }}
      thousandSeparator={' '}
      valueIsNumericString
    />
  )
})

export default ThousandSeparatorFormat
