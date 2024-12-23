
# Chat Application

### Technologies
    1. Express JS
    2. MongoDB
    3. Redis
    4. React JS

### Backend project setup
    1. git clone https://github.com/imrancse94/chat-application.git and go to project root
    2. In project root cp .env.dev .env
    3. Install Docker into your host machine. 
    4. Run ``docker-compose up --build -d``
    5. After running docker project will run on ``8000`` port. You can access from your host machine. ``http://<host-ip>:8000``

### Frontend project setup
    1. From project root and cd frontend
    2. cp .env.example .env and put VITE_BASE_URL="<backend-base-url>:8000"
    3. Run ``npm install``
    4. Run ``npm run dev``
    5. Go to browser and visit <frontend-host-url>:3000

### Instruction for application
    1. Visit <frontend-host-url>:3000/signup
    2. Create 2 different account
    3. Go to <frontend-host-url>:3000/login
    4. Login and create room with user
    5. Now chat each other

#### Note: To reduce db load in real time communication. I used pub/sub concept. That can reduce db load. 
#### Note: To check api, you will find a postman collection in project root.

