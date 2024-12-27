import { ReactElement, useState } from 'react'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import { Button, Dialog, Stack, useMediaQuery, useTheme } from '@mui/material'
import { EventCallable, Store } from 'effector'
import { useUnit } from 'effector-react'
import DeleteSelectedItems from '@/components/DeleteSelectedItems'

export default function CreateAndDelete<T>({
  title,
  $selectedBulkActions,
  handleOpenConfirmDeleteEv,
  addItemEl,
}: {
  title: string
  $selectedBulkActions: Store<boolean>
  handleOpenConfirmDeleteEv: EventCallable<T | null>
  addItemEl: ReactElement
}) {
  const [opened, setOpened] = useState(false)
  const [selectedBulkActions, handleOpenConfirmDelete] = useUnit([
    $selectedBulkActions,
    handleOpenConfirmDeleteEv,
  ])

  const theme = useTheme()
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Dialog
        fullScreen={isDownSm}
        fullWidth
        maxWidth="md"
        open={opened}
        onClose={() => setOpened(false)}
      >
        {addItemEl}
      </Dialog>
      <Stack direction={'row'}>
        {selectedBulkActions && (
          <DeleteSelectedItems onClick={() => handleOpenConfirmDelete(null)} />
        )}

        <Button
          size={'small'}
          variant={'outlined'}
          startIcon={<AddTwoToneIcon />}
          onClick={() => setOpened(true)}
        >
          {title}
        </Button>
      </Stack>
    </>
  )
}
