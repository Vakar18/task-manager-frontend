import React, { useState, useEffect } from "react";
import { Fab, Tooltip } from "@mui/material";
import TaskList from "../TaskList";
import AddTaskModal from "../AddTaskModal";
import axios from "axios";
import { createSvgIcon } from '@mui/material/utils';

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    deadline: "",
    linkedFile: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://task-manager-backend-twg2.onrender.com/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpen = (task = null) => {
    setIsEditing(!!task);
    setTaskData(task || { title: "", description: "", deadline: "", linkedFile: null });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskData({ title: "", description: "", deadline: "", linkedFile: null });
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", taskData.title);
    formData.append("description", taskData.description);
    formData.append("deadline", taskData.deadline);
    if (taskData.linkedFile) formData.append("linkedFile", taskData.linkedFile);

    const endpoint = isEditing
      ? `https://task-manager-backend-twg2.onrender.com/api/tasks/${taskData._id}`
      : "https://task-manager-backend-twg2.onrender.com/api/tasks";
    const method = isEditing ? "put" : "post";

    try {
      const response = await axios({
        method,
        url: endpoint,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (isEditing) {
        setTasks(tasks.map((task) => (task._id === response.data._id ? response.data : task)));
      } else {
        setTasks([...tasks, response.data]);
      }

      fetchTasks();
      handleClose();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const PlusIcon = createSvgIcon(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>,
    'Plus',
  );

  return (
    <div>
      <TaskList tasks={tasks} onEditTask={handleOpen} />
      <Tooltip title="Add Task" aria-label="add">
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: "fixed", bottom: 20, right: 20 }}
          onClick={() => handleOpen()}
        >
          <PlusIcon />
        </Fab>
      </Tooltip>
      <AddTaskModal 
        open={open} 
        handleClose={handleClose} 
        taskData={taskData}
        setTaskData={setTaskData}
        handleSave={handleSave}
        isEditing={isEditing}
      />
    </div>
  );
};

export default HomePage;
