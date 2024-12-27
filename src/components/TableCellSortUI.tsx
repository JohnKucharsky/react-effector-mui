import { Box, TableCell, TableCellProps, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'

export default function TableCellSortUI({
  handleRequestSort,
  sortOrder,
  orderBy,
  label,
  value,
  ...tableCellProps
}: {
  handleRequestSort: (payload: string) => string
  sortOrder: 'asc' | 'desc'
  orderBy: string
  label: string
  value: string
} & TableCellProps) {
  return (
    <TableCell {...tableCellProps}>
      <TableSortLabel
        active={orderBy === value}
        direction={orderBy === value ? sortOrder : 'asc'}
        onClick={() => handleRequestSort(value)}
      >
        {label}
        {orderBy === value ? (
          <Box component="span" sx={visuallyHidden}>
            {sortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  )
}
