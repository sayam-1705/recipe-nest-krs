# 🎨 Plate Planner - Frontend Documentation

## 📌 Overview

The frontend of **Plate Planner** is built using **React.js** and **Vite**, providing a fast and optimized user experience. It offers an intuitive interface for meal planning, personalized recipe suggestions, and nutritional insights.

---

### 🚀 About Vite

Vite is a modern frontend build tool designed for speed and efficiency. It features instant server startup, on-demand compilation, and hot module replacement, making development seamless and performant.

---

## 🌐 Frontend Endpoints

| Path                 | Component                  | Description                                         |
| -------------------- | -------------------------- | --------------------------------------------------- |
| `/signup`            | `Signup`                   | User signup page                                    |
| `/signin`            | `Signin`                   | User login page                                     |
| `/`                  | `Home`                     | Landing page                                        |
| `/dashboard`         | `Dashboard` (Protected)    | User dashboard (requires authentication)            |
| `/update-recipe/:id` | `UpdateRecipe` (Protected) | Update an existing recipe (requires authentication) |
| `/create-recipe`     | `CreateRecipe` (Protected) | Create a new recipe (requires authentication)       |
| `/search-recipe`     | `SearchElements`           | Search for recipes                                  |

---

## 📂 Frontend Folder Structure

```
frontend/
│── public/
│── src/
│   ├── assets/         # Static assets like images, icons, and styles
│   ├── components/     # Reusable UI components (buttons, modals, forms, etc.)
│   ├── pages/          # Page components for different routes (Home, Dashboard, etc.)
│   ├── utils/          # Utility functions and helper methods
│   ├── App.css         # Global CSS styles for the application
│   ├── App.jsx         # Main application component
│   ├── index.css       # General styling for the project
│   ├── main.jsx        # Entry point of the application
│── index.html
│── vite.config.js
```

### 📂 Folder & File Descriptions

- **assets/**: Stores static assets such as images, icons, and global styles.
- **components/**: Contains reusable UI components like buttons, modals, and input fields.
- **pages/**: Includes different page components corresponding to app routes.
- **utils/**: Houses utility functions for formatting, API calls, and other helper methods.
- **App.css**: Contains global CSS styles for the app.
- **App.jsx**: The root component that manages routing and layout.
- **index.css**: Holds additional styling configurations.
- **main.jsx**: The entry file that renders the React app into the DOM.

---

## 🛠️ Dependencies

- **axios**: Handles HTTP requests to communicate with the backend.
- **chart.js**: Renders graphical nutritional insights.
- **multer**: Handles file uploads, such as recipe images.
- **react**: Core library for building the user interface.
- **react-dom**: Enables React to interact with the DOM.
- **react-modal**: Provides a flexible modal component.
- **react-router-dom**: Enables client-side routing and navigation.

---

## 🛠️ Troubleshooting

#### 1. **Development Server Not Starting**

- **Issue:** When running `npm run dev` or `vite`, the server fails to start.
- **Solution:**
  - Ensure that all dependencies are installed by running `npm install`.
  - Check if you have the correct Node.js version. You can verify it by running `node -v`.
  - If the issue persists, try deleting the `node_modules` folder and the `package-lock.json` file, then run `npm install` again.

#### 2. **Error: Module Not Found**

- **Issue:** The terminal shows an error like "Module not found: Error: Can't resolve 'xyz'."
- **Solution:**
  - Ensure that the required module is installed by running `npm install <module-name>`.
  - Check the `import` or `require` statement in your code to ensure that the module is correctly imported.

#### 3. **Vite Configuration Errors**

- **Issue:** Errors related to Vite's configuration file (`vite.config.js`).
- **Solution:**
  - Ensure that all necessary plugins and configurations are added to `vite.config.js`.
  - Verify that your configuration follows the [Vite documentation](https://vitejs.dev/config/).
  - If an error occurs after an update, consult Vite's changelog for any breaking changes.

---

## 📚 References

- [React.js Documentation](https://react.dev/reference/react)
- [Vite Documentation](http://vite.dev/guide/)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)

---

## 👨‍💻 Contributing

We welcome contributions! Feel free to fork the repo, create a new branch, and submit a pull request.

Happy Coding! 🚀
