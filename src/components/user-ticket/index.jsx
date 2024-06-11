import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchUserTickets } from "../../redux/slices/jira";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const UserTickets = () => {
  const { userTickets, isLoading, error } = useSelector((state) => state.jira);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserTickets());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error" icon={<ErrorOutlineIcon />}>
          Error: {error}
        </Alert>
      ) : (
        <ul>
          {userTickets.map((ticket) => (
            <li key={ticket?.id}>
              <Link
                to={`https://salohiddintojiyev.atlassian.net/jira/software/projects/KAN/boards/1${ticket.key}`}
              >
                {ticket?.summary}
              </Link>{" "}
              - {ticket?.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserTickets;
