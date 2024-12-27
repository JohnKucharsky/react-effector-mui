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
import { formatAddress } from '@/features/users/data/service.tsx'
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

        <TableCell>
          <Typography variant="h5">{user.name}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h5">{user.username}</Typography>
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell>{user.website}</TableCell>
        <TableCell>{formatAddress(user.address)}</TableCell>
        <TableCell onClick={handleEditOpen}>{user.company.name}</TableCell>
      </TableRow>
    </>
  )
}
