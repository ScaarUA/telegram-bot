import styled from "@emotion/styled";
import { Card, IconButton } from "@mui/material";

export const StyledCard = styled(Card)`
  height: 100%;
  position: relative;
`

export const EditIcon = styled(IconButton)`
  position: absolute;
  top: 12px;
  right: 12px;
  color: #2196F3;
`;

export const CancelIcon = styled(IconButton)`
  position: absolute;
  top: calc(12px + 12px + 40px);
  right: 12px;
  color: #EF5350;
`;