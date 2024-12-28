import { Box, Stack, Typography } from '@mui/material'
import * as muiColors from '@mui/material/colors'
import { useUnit } from 'effector-react'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { $primaryColor, handleChangePrimaryColorEv } from '@/layout/store.ts'

const colors = Object.entries(
  _.omit(muiColors, ['common', 'yellow', 'lime', 'red']),
).reduce(
  (acc, [name, shades]) => {
    acc[name] = shades['500']
    return acc
  },
  {} as Record<string, string>,
)

const shadeToName = Object.entries(_.omit(muiColors, ['common'])).reduce(
  (acc, [name, shades]) => {
    acc[shades['500']] = name
    return acc
  },
  {} as Record<string, string>,
)

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useUnit([
    $primaryColor,
    handleChangePrimaryColorEv,
  ])

  const { t } = useTranslation()

  const handleClick = (color: string) => {
    setSelectedColor(color)
  }

  return (
    <Box p={2} minWidth={'1rem'}>
      <Stack direction={'row'} spacing={0.5} alignItems={'flex-end'} mb={1}>
        <Typography lineHeight={1} variant="body1">
          {t('pickedColor')}:
        </Typography>
        <Typography
          lineHeight={1}
          fontWeight={'bold'}
          sx={{ color: selectedColor }}
          variant="body2"
        >
          {shadeToName[selectedColor]}
        </Typography>
      </Stack>

      <Box
        width={'12rem'}
        height={'12rem'}
        display={'grid'}
        sx={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
        }}
      >
        {Object.entries(colors).map(([colorName, shade]) => (
          <Box
            width={'100%'}
            height={'100%'}
            key={colorName}
            sx={{
              backgroundColor: shade,
              cursor: 'pointer',
            }}
            onClick={() => handleClick(shade)}
          />
        ))}
      </Box>
    </Box>
  )
}

export default ColorPicker
