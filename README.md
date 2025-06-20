# TextToImage Converter

TextToImage Converter is a web application that allows users to generate creative and visually appealing images from text prompts. This project integrates a robust backend with an interactive frontend, providing a seamless experience for users to explore their creativity.

---

## Features

- **User Authentication:** Secure login and signup functionality.
- **Credits System:** Users can purchase credits to generate images.
- **Text-to-Image Generation:** AI-powered generation of images from text prompts.
- **Razorpay Integration:** Integrated payment gateway for purchasing credits.
- **Responsive Design:** Fully responsive UI for an optimal experience across devices.

---

## Technologies Used

### Frontend:
- **ReactJS**: For building dynamic and responsive user interfaces.
- **Vite**: Lightning-fast development environment.
- **CSS/Tailwind**: For styling and responsive design.

### Backend:
- **Node.js**: For server-side logic.
- **Express.js**: Lightweight web framework.
- **MongoDB**: NoSQL database for secure user and transaction data.
- **Razorpay API**: Payment gateway integration.

### Other:
- **JWT**: For secure authentication.
- **dotenv**: For environment variable management.

---

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or above)
- **npm** or **yarn**
- **MongoDB**

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/textToimage_convertor.git
   cd textToimage_convertor
2. **Set Up the Backend**:
   ```bash
   cd backend
   npm install
 **Create a .env file in the backend directory and add the required environment variables**:
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   RAZORPAY_KEY_ID=<your-razorpay-key-id>
   RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
3. **Set Up the Frontend**:
      bash
   `cd ../frontend
   npm install `
 **Create a .env file in the frontend directory and add the following**:
   VITE_BACKEND_URL=http://localhost:4000
   VITE_RAZORPAY_KEY_ID=<your-razorpay-key-id>
4. **Run the Application**:
   Start the backend server:
   bash
    `cd backend
    npm start`
    
    Start the frontend server:
   bash
    `cd frontend
    npm run dev`
   
   **Usage**
   1. Sign Up or Log In to your account.
    
   2. Purchase Credits through Razorpay to use the image generation feature.
    
   3. Enter a text prompt and generate creative images.
    
   4. Download or share your generated images.


