# Social Media App

A modern, full-featured Social Media application built with **React 19** and **Tailwind CSS 4**. This project features a responsive design, smooth animations, and robust state management for a premium user experience.

## ✨ Features

- 🔐 **User Authentication**: Secure Login and Registration flows.
- 📱 **Responsive Feed**: Browse posts from other users with a seamless scrolling experience.
- 📝 **Create & Edit Posts**: Share your thoughts with text and images.
- 💬 **Interactions**: Like and comment on posts to engage with the community.
- 👤 **Profile Management**: View and customize your profile, including changing passwords and profile photos.
- 🔍 **Post Details**: Deep-dive into specific posts to see full content and all comments.

## 🚀 Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [HeroUI](https://heroui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **API Client**: [Axios](https://axios-http.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Icons**: [Lucide React](https://lucide.dev/) & [Font Awesome](https://fontawesome.com/)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mayarmohamed123/SocialMediaApp.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SocialMediaApp
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 📂 Project Structure

- `src/Components`: Reusable UI components (Navbar, Post, Comment, etc.).
- `src/Pages`: Top-level page components (Feed, Profile, Login, Register).
- `src/Contexts`: React Context providers for global state.
- `src/Services`: API service layers using Axios.
- `src/Layouts`: Application layout wrappers.
- `src/ProtectedRoutes`: Route guards for authenticated access.
