import { CardContent, Stack, TextField, Typography } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { CancelIcon, EditIcon, StyledCard } from "./styles";
import { useState } from "react";
import api from "../../utils/api";

function UserCard({ user, updateUsers }) {
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
      console.log(user);
      await api.put(`/api/users/${user._id}`, editedUser);
      await updateUsers();
    }

    setEditMode(!editMode)
  }

  return (
    <StyledCard sx={{height: '100%'}}>
      <EditIcon onClick={onEditButtonClick}>{editMode ? <CheckIcon /> : <ModeEditIcon />}</EditIcon>
      {editMode && <CancelIcon onClick={() => setEditMode(false)}><CloseIcon /></CancelIcon>}
      <CardContent>
        {editMode ? (
          <Stack spacing={2} marginRight="40px">
            <TextField label="Ім'я" placeholder="Ім'я для тэгу, якщо э tg ID" value={editedUser.name} onChange={onUserFieldChange('name')} />
            <TextField label="Нікнейм" placeholder="Якщо нема tg ID, то потрібен нікнейм" value={editedUser.nickname} onChange={onUserFieldChange('nickname')} />
            <TextField label="Telegram ID" placeholder="Telegram ID" value={editedUser.tgId} onChange={onUserFieldChange('tgId')} />
          </Stack>
        ) : (
          <>
            <Typography variant="h5">{user.name || user.nickname}</Typography>
            {user.tgId && <Typography>{user.tgId}</Typography>}
          </>
        )}
      </CardContent>
    </StyledCard>
  );
}

export default UserCard;
