import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchUserTickets } from "../../redux/slices/jira";
import { Link } from "react-router-dom";

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
      ) : (
        <ul>
          {userTickets.map((ticket) => (
            <li key={ticket.id}>
              <Link
                href={`https://<yourdomain>.atlassian.net/browse/${ticket.key}`}
              >
                {ticket.summary}
              </Link>{" "}
              - {ticket.status}
            </li>
          ))}
        </ul>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default UserTickets;
