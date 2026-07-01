// components/content/OrderedList.tsx
import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface OrderedListProps {
  items: ReactNode[];
}

export function OrderedList({ items }: OrderedListProps) {
  return (
    <Box component="ol" sx={{ pl: { xs: 1, md: 3 }, mb: 2 }}>
      {items.map((item, index) => (
        <Typography
          component="li"
          key={index}
          sx={{
            mb: 0.75,
            color: 'grey.700',
            lineHeight: 1.8,
          }}
        >
          {item}
        </Typography>
      ))}
    </Box>
  );
}