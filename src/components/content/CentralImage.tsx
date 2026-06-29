// components/content/CentralImage.tsx
import { Box } from '@mui/material';

interface CentralImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}

export function CentralImage({ 
  src, 
  alt, 
}: CentralImageProps) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 2,
        my: 2,
        mx: 'auto',
      }}
    />
  );
}