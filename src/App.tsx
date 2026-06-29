// App.tsx
import { QuestionsList } from './components/QuestionList';
import { Box, Container } from '@mui/material';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 4 }}>
      <Container maxWidth="lg">
        <QuestionsList />
      </Container>
    </Box>
  );
}

export default App;