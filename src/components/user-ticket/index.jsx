import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const getCurrentUser = () => {
  return { username: "current-user" };
};

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [jiraTickets, setJiraTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = getCurrentUser().username;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const [localTicketsResponse, jiraTicketsResponse] = await Promise.all([
          axios.get("http://localhost:3002/api/tickets"),
          axios.get("http://localhost:3002/api/jira-user-tickets", {
            params: { username },
          }),
        ]);

        setTickets(localTicketsResponse.data);
        setJiraTickets(jiraTicketsResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchTickets();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Tickets</h1>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>{ticket.title}</li>
        ))}
      </ul>

      <h2>Jira User Tickets</h2>
      <ul>
        {jiraTickets.map((ticket) => (
          <li key={ticket.id}>{ticket.summary}</li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
