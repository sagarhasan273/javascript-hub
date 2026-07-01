// components/content/UnorderedList.tsx
import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface UnorderedListProps {
  items: ReactNode[];
}

export function UnorderedList({ items }: UnorderedListProps) {
  return (
    <Box component="ul" sx={{ pl: { xs: 1, md: 3 }, mb: 2 }}>
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