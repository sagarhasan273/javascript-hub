// components/content/Divider.tsx
import { Divider as MuiDivider } from '@mui/material';

export function Divider({sx}: {sx?: object}) {
  return <MuiDivider sx={{ my: 3, ...sx }} />;
}