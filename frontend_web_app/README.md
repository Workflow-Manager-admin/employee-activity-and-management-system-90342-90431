# TATA ELXSI – React Frontend

This project provides a minimal React template for the **TATA ELXSI** platform, with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with TATA ELXSI brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --primary-blue: #25488A;
  --secondary-purple: #A42B8D;
  --accent-yellow: #F5C400;
  --accent-pink: #D81D6D;
  --bg-canvas: #FFFFFF;
  --light-bg: #F5F6FB;
  --text-white: #FFFFFF;
  --text-dark: #23243b;
  --border-color: #e9ecef;
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.button-primary`, `.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

---

All references to system/application names are unified under **TATA ELXSI**.
