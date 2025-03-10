# TodoList App MVC

This project was developed to demonstrate the application of the **MVC** (Model-View-Controller) architectural pattern in a JavaScript application. It uses a Restful API to manage application data based on the `database.json` file. The application is built using Node.js.

## ✨ Features

- Manage a task list.
- Create tasks.
- Delete tasks.
- Update tasks (modify name and mark as completed).

## 📦 Dependencies

The project relies on the following dependencies:
- json-server: Used to create a simulated Restful API from the `database.json` file, enabling quick prototyping and testing.

## 🛠️ Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/victoandrad/TodoList_Application_v2.git
   ```

2. Navigate to the project directory:

   ```bash
   cd TodoList_Application_v2
   ```

3. Install dependencies:

   ```bash
   npm install json-server
   ```

## 🚀 Starting the Application

To start the project, use the command:

```bash
npm start
```

> If the `start` script is not configured, use:
>
> ```bash
> npm run start
> ```

The application will be available at the main route:

```
http://localhost:3000
```

### 🌐 API Endpoint

All requests related to **tasks** can be made using the endpoint:

```
http://localhost:3000/tasks
```

## 🤝 How to Contribute

1. Fork this repository.
2. Create a branch for your feature:

   ```bash
   git checkout -b my-feature
   ```

3. Make your changes and add commits:

   ```bash
   git commit -m "My new feature"
   ```

4. Push your changes:

   ```bash
   git push origin my-feature
   ```

5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License. Feel free to use and modify it as needed.
