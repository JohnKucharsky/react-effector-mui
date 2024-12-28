import { Checkbox, FormControlLabel } from '@mui/material'
import { EventCallable, Store } from 'effector'
import { useUnit } from 'effector-react'

export default function CheckboxEl({
  $checked,
  setCheckedEv,
  title,
}: {
  $checked: Store<boolean>
  setCheckedEv: EventCallable<boolean>
  title: string
}) {
  const [checked, setChecked] = useUnit([$checked, setCheckedEv])

  return (
    <FormControlLabel
      labelPlacement={'end'}
      control={
        <Checkbox
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
      }
      label={title}
    />
  )
}
