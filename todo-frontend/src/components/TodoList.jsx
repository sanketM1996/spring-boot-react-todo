import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, editTodo, removeTodo } from '../features/todos/todoSlice';
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TodoList() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Failed to load todos</p>;

  return (
    <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {items.map((todo) => (
        <Paper
          key={todo.id}
          elevation={2}
          sx={{
            borderRadius: 3,
            transition: '0.2s',
            '&:hover': {
              boxShadow: 6
            }
          }}
        >
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                onClick={() => dispatch(removeTodo(todo.id))}
                sx={{ color: 'error.main' }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <Checkbox
              checked={todo.completed}
              onChange={() =>
                dispatch(
                  editTodo({
                    id: todo.id,
                    data: { ...todo, completed: !todo.completed }
                  })
                )
              }
            />

            <ListItemText
              primary={todo.title}
              secondary={todo.description}
              primaryTypographyProps={{
                fontWeight: 500,
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
              secondaryTypographyProps={{
                sx: {
                  opacity: todo.completed ? 0.6 : 0.8
                }
              }}
            />
          </ListItem>
        </Paper>
      ))}
    </List>
  );
}