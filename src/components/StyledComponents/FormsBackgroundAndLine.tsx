import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Box,
  SxProps,
  Theme,
  Tooltip,
  Typography,
  css,
  styled,
} from '@mui/material'

export const BackgroundBox = styled(Box)(
  ({ theme }: { theme?: Theme }) => css`
    background-color: ${theme?.palette.background.default};
    border-radius: 0.5rem;
    padding: 0.75rem;
    ${theme?.breakpoints.down('md')} {
      padding: 0.75rem 0.5rem 0.75rem 0.5rem;
    }
    position: relative;
    display: grid;
  `,
)

export const GreyText = styled(Typography)(
  ({ theme }) => css`
    color: ${theme?.palette.background.default};
    text-transform: uppercase;
    line-height: 1.2;
  `,
)

export const LineWrapper: FunctionComponent<
  PropsWithChildren<{
    title: string
    sx?: SxProps<Theme> | undefined
    required?: boolean
  }>
> = ({ title, sx, required, children }) => {
  const [overflowing, setOverflowing] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const offsetWidth = ref.current.offsetWidth
      const scrollWidth = ref.current.scrollWidth

      setOverflowing(offsetWidth < scrollWidth)
    }
  }, [])

  return (
    <>
      <Box display={'grid'} alignItems={'center'} gap={'0.5rem'} sx={sx}>
        <Tooltip title={overflowing ? title : ''}>
          <GreyText ref={ref} noWrap>
            {title}
            {required ? '*' : ''}
          </GreyText>
        </Tooltip>
        {children}
      </Box>
    </>
  )
}
