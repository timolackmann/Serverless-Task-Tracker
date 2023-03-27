import React, { useContext, useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { UserContext } from '../contexts/user.context';
import { Checkbox, Box } from '@mui/material'
import FormDialog from './taskForm';

export default function TasksGrid() {
  const { getToDos, refreshData, updateTask } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    getToDos().then(tasks => setTasks(tasks));
  }, [refreshData]);

  const changeStatus = (e, id) => {
    updateTask(id, 'completed', e.target.checked)
  };
  
  const RenderCheckbox = (props) => {
    const { value, id } = props;

    return <Checkbox defaultChecked={value} onChange={e => changeStatus(e, id)} />;
  }  

  const columns = [
    {   field: "title", 
        headerName: "Task",
        flex: 0.5
    },
    {   field: "description", 
        headerName: "Description",
        flex: 1 
    }, 
    {   field: "completed", 
        headerName: "Completed",
        renderCell: RenderCheckbox
    }
  ];

  return (
    <Box sx={{ width: '50%', paddingLeft: '25%' }}>
      <FormDialog/>
        <Box sx={{ height: 400, mt: 1 }}>
            <DataGrid
            columns={columns}
            rows={tasks} 
            getRowId={(row) => row._id}
            disableSelectionOnClick={true}
            />
        </Box>
    </Box>
  );
}
