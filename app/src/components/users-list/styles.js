import styled from "@emotion/styled";
import { Card, IconButton } from "@mui/material";

export const StyledCard = styled(Card)`
  height: 100%;
    min-height: 96px;
  position: relative;
`

export const EditIcon = styled(IconButton)`
  position: absolute;
  top: 12px;
  right: 12px;
  color: #2196F3;
`;

export const CreateIcon = styled(IconButton)`
  height: 100%;
  width: 100%;
  color: #2196F3;
  border-radius: 0;
`;

export const CancelIcon = styled(IconButton)`
  position: absolute;
  top: calc(12px + 12px + 40px);
  right: 12px;
  color: #EF5350;
`;

export const DeleteIcon = styled(IconButton)`
    position: absolute;
    bottom: 12px;
    right: 12px;
    color: #EF5350;
`;