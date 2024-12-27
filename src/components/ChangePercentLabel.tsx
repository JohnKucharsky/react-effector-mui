import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Stack, Typography } from '@mui/material'
import { NumericFormat } from 'react-number-format'

export default function ChangePercentLabel({
  direction,
  value,
}: {
  direction: 'up' | 'down'
  value: number
}) {
  const Arrow = { up: ArrowUpwardIcon, down: ArrowDownwardIcon }[direction]
  const colors = {
    arrow_up: 'success',
    arrow_down: 'primary',
    font_up: 'green',
    font_down: 'primary',
    background_up: '#D0F4B9',
    background_down: '#DEEDFC',
  } as const

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      sx={{
        backgroundColor: colors[`background_${direction}`],
        padding: '2px 6px 2px 2px',
        borderRadius: '4px',
      }}
    >
      <Arrow
        color={colors[`arrow_${direction}`]}
        sx={{ height: '1rem', width: 'auto' }}
      />

      <NumericFormat
        displayType="text"
        value={Math.abs(value)}
        decimalScale={2}
        thousandSeparator={' '}
        suffix={`%`}
        renderText={(formattedValue) => (
          <Typography
            fontSize={12}
            fontWeight={500}
            color={colors[`font_${direction}`]}
            noWrap
          >
            {formattedValue}
          </Typography>
        )}
      />
    </Stack>
  )
}
