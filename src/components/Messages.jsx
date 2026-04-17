import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { api } from "../utils/api";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await api.get("/api/v1/message/getall");
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response?.data?.message || "Failed to fetch messages");
      }
    };

    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page messages">
      <h1>MESSAGES</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => (
            <div className="card" key={element._id}>
              <div className="details">
                <p>
                  First Name: <span>{element.firstName || "N/A"}</span>
                </p>
                <p>
                  Last Name: <span>{element.lastName || "N/A"}</span>
                </p>
                <p>
                  Email: <span>{element.email || "N/A"}</span>
                </p>
                <p>
                  Phone: <span>{element.phone || "N/A"}</span>
                </p>
                <p>
                  Message: <span>{element.message || "N/A"}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;

