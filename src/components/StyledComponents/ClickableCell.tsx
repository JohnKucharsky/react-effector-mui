import { TableCell, css } from '@mui/material'
import { styled } from '@mui/material/styles'

const ClickableCell = styled(TableCell)(
  ({ props }: { props: { hasNoPermission: boolean | undefined } }) => css`
    cursor: ${props.hasNoPermission ? undefined : 'pointer'};
  `,
)

export default ClickableCell
