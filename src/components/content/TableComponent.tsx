// components/content/TableComponent.tsx
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface TableComponentProps {
  headers: string[];
  rows: (string | number)[][];
}

export function TableComponent({ headers, rows }: TableComponentProps) {
  return (
    <TableContainer component={Paper} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.100' }}>
            {headers.map((header, index) => (
              <TableCell key={index} sx={{ fontWeight: 700, color: 'grey.800' }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} sx={{ color: 'grey.700' }}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}