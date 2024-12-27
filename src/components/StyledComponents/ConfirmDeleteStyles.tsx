import { ReactElement, Ref, forwardRef } from 'react'
import { LoadingButton } from '@mui/lab'
import { Slide, css, styled } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

export const ButtonError = styled(LoadingButton)(
  ({ theme }) => css`
    background: ${theme.palette.error.main};
    color: ${theme.palette.error.contrastText};

    &:hover {
      background: ${theme.palette.error.dark};
    }
  `,
)

export const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement },
  ref: Ref<unknown>,
) {
  return (
    <Slide direction="down" ref={ref} {...props}>
      {props.children}
    </Slide>
  )
})
