import { CardContent, Stack, TextField, Typography } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { CancelIcon, EditIcon, StyledCard, CreateIcon } from "./styles";
import { useState } from "react";
import api from "../../utils/api";

function UserCard({ user = {}, updateUsers, newUser }) {
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ name: user.name, nickname: user.nickname, tgId: user.tgId })

  const onUserFieldChange = field => event => {
    setEditedUser({
      ...editedUser,
      [field]: event.target.value,
    });
  }

  const onEditButtonClick = async () => {
    if (editMode) {
      if (newUser) {
        await api.post('/api/users/', editedUser);
      } else {
        await api.put(`/api/users/${user._id}`, editedUser);
      }

      await updateUsers();
    }

    setEditMode(!editMode)
  }

  const renderContent = () => {
    if (editMode) {
      return (
        <Stack spacing={2} marginRight="40px">
          <TextField label="Ім'я" placeholder="Ім'я для тэгу, якщо э tg ID" value={editedUser.name} onChange={onUserFieldChange('name')} />
          <TextField label="Нікнейм" placeholder="Якщо нема tg ID, то потрібен нікнейм" value={editedUser.nickname} onChange={onUserFieldChange('nickname')} />
          <TextField label="Telegram ID" placeholder="Telegram ID" value={editedUser.tgId} onChange={onUserFieldChange('tgId')} />
        </Stack>
      );
    }

    if (newUser) {
      return (
        <CreateIcon size="large" onClick={onEditButtonClick}><AddBoxIcon /></CreateIcon>
      )
    }

    return (
      <>
        <Typography variant="h5">{user.name || user.nickname}</Typography>
        {user.tgId && <Typography>{user.tgId}</Typography>}
      </>
    );
  }

  return (
    <StyledCard sx={{height: '100%'}}>
      {(!newUser || editMode) && <EditIcon onClick={onEditButtonClick}>{editMode ? <CheckIcon /> : <ModeEditIcon />}</EditIcon>}
      {editMode && <CancelIcon onClick={() => setEditMode(false)}><CloseIcon /></CancelIcon>}
      <CardContent>
        {renderContent()}
      </CardContent>
    </StyledCard>
  );
}

export default UserCard;
