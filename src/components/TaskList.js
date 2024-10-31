import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

const TaskList = ({ onEditTask, onAddTask }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://task-manager-backend-twg2.onrender.com/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://task-manager-backend-twg2.onrender.com/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStatusUpdate = async (id) => {
    try {
      await axios.patch(`https://task-manager-backend-twg2.onrender.com/api/tasks/${id}/status`);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      {tasks.length === 0 ? (
        <Typography variant="h6" align="center" style={{ marginTop: 70 }}>
          No tasks found!
        </Typography>
      ) : (
        <div style={{ position: 'relative', padding: '60px' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{new Date(task.deadline).toLocaleDateString()}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    <Tooltip title="Mark as Done">
                      <IconButton onClick={() => handleStatusUpdate(task._id)}>
                        <CheckCircleIcon style={{ color: task.status === 'DONE' ? 'green' : 'gray' }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => onEditTask(task)}>
                        <EditIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(task._id)}>
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      )}   
    </div>
  );
};

export default TaskList;
