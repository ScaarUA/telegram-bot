import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import api from "../../utils/api";

function UsersList() {
  const [users, setUsers] = useState(null);

  const updateUsers = () => api('/api/users').then(res => setUsers(res.data));

  useEffect(() => {
    updateUsers();
  }, []);

  return (
    <Grid container spacing={2}>
      {!!users && users.map(user => (
        <Grid key={user.objectId} item xs={12} sm={6} md={4}>
          <UserCard user={user} updateUsers={updateUsers} />
        </Grid>
      ))}
      <Grid item xs={12} sm={6} md={4}>
        <UserCard newUser updateUsers={updateUsers} />
      </Grid>
    </Grid>
  );
}

export default UsersList;
