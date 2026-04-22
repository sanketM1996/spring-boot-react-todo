import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="sm" style={{ marginTop: 40 }}>
     <Typography variant="h4" gutterBottom color="text.primary">
  Todo App
</Typography>
      <TodoForm />
      <TodoList />
    </Container>
  );
}
