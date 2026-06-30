// components/content/TableComponent.tsx
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, alpha } from '@mui/material';

interface TableComponentProps {
  headers: string[];
  rows: (string | number)[][];
  variant?: 'default' | 'striped' | 'bordered';
}

export function TableComponent({ 
  headers, 
  rows, 
  variant = 'striped' 
}: TableComponentProps) {
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        mb: 2, 
        borderRadius: 2, 
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'grey.200',
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ 
            bgcolor: 'grey.100',
            '& th': {
              fontWeight: 700,
              color: 'grey.800',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }
          }}>
            {headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow 
              key={rowIndex} 
              sx={{ 
                '&:hover': { 
                  bgcolor: alpha('#2563eb', 0.04) 
                },
                ...(variant === 'striped' && rowIndex % 2 === 0 && {
                  bgcolor: 'grey.50',
                }),
                '& td': {
                  color: 'grey.700',
                  py: 1.5,
                }
              }}
            >
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}