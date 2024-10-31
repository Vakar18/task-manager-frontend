import React from 'react';
import { Modal, TextField, Button, Box } from '@mui/material';

const AddTaskModal = ({ open, handleClose, taskData, setTaskData, handleSave, isEditing }) => {

  return (
    <Modal open={open} onClose={handleClose}>
      <Box 
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          padding: 3,
          backgroundColor: 'white',
          width: '400px',
          margin: 'auto',
          marginTop: '10%',
          borderRadius: '8px',
          boxShadow: 24
        }}
      >
        <TextField 
          label="Title" 
          value={taskData.title} 
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} 
          required 
          fullWidth 
        />
        <TextField 
          label="Description" 
          value={taskData.description} 
          onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} 
          required 
          fullWidth 
          multiline
        />
        <TextField 
          type="date" 
          label="Deadline" 
          value={taskData.deadline} 
          onChange={(e) => setTaskData({ ...taskData, deadline: e.target.value })} 
          required 
          fullWidth 
          InputLabelProps={{
            shrink: true,
          }}
        />
        <input 
          type="file" 
          onChange={(e) => setTaskData({ ...taskData, linkedFile: e.target.files[0] })} 
          style={{ marginBottom: '16px' }}
        />
        <Button type="submit" variant="contained" color="primary">
          {isEditing ? "Update Task" : "Add Task"}
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;
