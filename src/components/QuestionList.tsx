// components/QuestionsList.tsx
// no state needed currently
import { Stack } from '@mui/material';
import {
  Question01,
  Question02,
  // Question03,
  // Question04,
  // Question05,
  // Question06,
  // Question07,
  // Question08,
  // Question09,
  // Question10,
} from '../data/questions';

export function QuestionsList() {
  const activeQuestionId: number | null = null;

  const questions = [
    { id: 1, component: Question01 },
    { id: 2, component: Question02 },
    // { id: 3, component: Question03 },
    // { id: 4, component: Question04 },
    // { id: 5, component: Question05 },
    // { id: 6, component: Question06 },
    // { id: 7, component: Question07 },
    // { id: 8, component: Question08 },
    // { id: 9, component: Question09 },
    // { id: 10, component: Question10 },
  ];

  return (
    <Stack spacing={4}>
      {questions.map(({ id, component: QuestionComponent }, index) => (
        <QuestionComponent
          key={id}
          index={index}
          isActive={activeQuestionId === id}
        />
      ))}
    </Stack>
  );
}