import React, { useState } from "react";
import { Button, Modal, TextField, Select, MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./CreateTicketButton.scss";

const theme = createTheme();

const CreateTicketButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [link] = useState(window.location.href);
  const [collection] = useState("Your Collection");

  const handleCreateTicket = async () => {
    try {
      const response = await axios.post("/api/create-ticket", {
        user: { username: "current-user" },
        summary,
        priority,
        link,
        collection,
      });
      const ticketKey = response.data.key;
      toast.success(
        `Ticket created: ${ticketKey}. Link: https://salohiddintojiyev.atlassian.net/jira/software/projects/KAN/boards/1${ticketKey}`
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error("Failed to create ticket");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <Button onClick={() => setIsModalOpen(true)}>Create Ticket</Button>
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="modal">
            <h2>Create Jira Ticket</h2>
            <TextField
              label="Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            <Select
              sx={{ marginTop: "30px" }}
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
            <Button onClick={handleCreateTicket}>Submit</Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </div>
        </Modal>
        <ToastContainer />
      </>
    </ThemeProvider>
  );
};

export default CreateTicketButton;
