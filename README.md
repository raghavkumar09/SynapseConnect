
# SynapseConnect

SynapseConnect is a real-time chat application that integrates AI to provide users with instant answers to their questions. Users can add collaborators, engage in private and group chats, and get AI-assisted responses for various queries. The application aims to facilitate communication and collaboration while offering a helpful AI-driven assistant.

## Features

- **Real-Time Chat**: Send and receive messages instantly in private or group chats.
- **Add Collaborators**: Invite and manage collaborators for private and group conversations.
- **AI Integration**: Ask questions and receive intelligent answers from the integrated AI assistant.
- **Private Chats**: One-on-one conversations with fellow users.
- **Group Chats**: Create and manage group chats for team discussions.
  
## Technologies Used

- **Frontend**: React.js, Tailwind CSS (for UI)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.IO
- **AI Integration**: OpenAI API (or your AI service of choice)
  
## Installation

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/raghavkumar09/synapseconnect.git
   ```

2. Install the necessary dependencies:

   - **Frontend**:
     ```bash
     cd frontend
     npm install
     ```

   - **Backend**:
     ```bash
     cd backend
     npm install
     ```

3. Set up environment variables in the `.env` file:

   - Backend: Include your AI service API key, database URL, and any other necessary keys.
   
4. Run the development servers:

   - **Frontend**:
     ```bash
     npm start
     ```

   - **Backend**:
     ```bash
     npm run dev
     ```

5. Open the application in your browser:
   - Frontend should be running at: `http://localhost:5174`
   - Backend should be running at: `http://localhost:5000`

## Usage

- **Sign Up/Login**: Create an account or log in to start chatting with your collaborators and accessing the AI assistant.
- **Create project**: Create a project and add the collaborator to that project, then chat.
- **Add Collaborators**: Invite users by email or username to join private and group chats.
- **Private and Group Chats**: Initiate private conversations or create group chats for team discussions.
- **AI Assistant**: Ask the AI assistant any question, and it will provide a relevant answer.

## Contributing

Contributions are welcome! Please follow these steps to contribute to the project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add feature'`).
5. Push to the branch (`git push origin feature-name`).
6. Create a new pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

For questions or support, feel free to reach out to:

- Email: [jharaghav330@gmail.com]
- GitHub: https://github.com/raghavkumar09/synapseconnect
```
