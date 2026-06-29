// components/content/Gap.tsx
import { Box } from '@mui/material';

interface GapProps {
  size?: number;
}

export function Gap({ size = 2 }: GapProps) {
  return <Box sx={{ height: size * 8 }} />;
}