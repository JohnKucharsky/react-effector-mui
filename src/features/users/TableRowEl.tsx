import { useState } from 'react'
import {
  Checkbox,
  Dialog,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useStoreMap, useUnit } from 'effector-react'
import { usersStore } from '@/features/users/data/store'
import { type User } from '@/features/users/data/types'
import Edit from '@/features/users/Edit'

export default function TableRowEl({ user }: { user: User }) {
  const [open, setOpen] = useState(false)
  const [handleSelectOne] = useUnit([usersStore.handleSelectOneEv])

  const theme = useTheme()
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'))

  const isSelected = useStoreMap({
    store: usersStore.$selectedItems,
    keys: [user.id],
    fn: (selectedItems, [id]) => {
      return selectedItems.has(id)
    },
  })

  const handleEditOpen = () => setOpen(true)
  const handleEditClose = () => setOpen(false)

  return (
    <>
      <Dialog
        fullScreen={isDownSm}
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleEditClose}
      >
        <Edit handleEditClose={handleEditClose} initialValues={user} />
      </Dialog>
      <TableRow hover selected={isSelected}>
        <TableCell padding="checkbox">
          <Checkbox
            sx={{
              height: '1rem',
            }}
            size={'small'}
            checked={isSelected}
            onChange={() => {
              handleSelectOne(user.id)
            }}
            value={isSelected}
          />
        </TableCell>

        <TableCell onClick={handleEditOpen}>
          <Typography variant="h5">{user.name}</Typography>
        </TableCell>
        <TableCell onClick={handleEditOpen}>
          <Typography variant="h5">{user.username}</Typography>
        </TableCell>
        <TableCell onClick={handleEditOpen}>{user.email}</TableCell>
        <TableCell onClick={handleEditOpen}>{user.phone}</TableCell>
        <TableCell onClick={handleEditOpen}>{user.website}</TableCell>
        <TableCell onClick={handleEditOpen}>{user.address.city}</TableCell>
      </TableRow>
    </>
  )
}
