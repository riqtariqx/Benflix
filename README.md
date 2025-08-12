# 🎬 benflix - React Movie Search App

A modern, responsive movie search application built with React, featuring an elegant UI and seamless user experience for discovering movies, TV shows, and managing your watchlist.


## ✨ Features

### 🎯 Core Functionality
- **Advanced Movie Search** - Search movies, TV shows, and actors with real-time results
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Interactive Navigation** - Modern navbar with smooth animations and transitions
- **User Management** - Profile system with notifications and watchlist functionality

### 🎨 Modern UI/UX
- **Glassmorphism Effects** - Modern translucent design elements
- **Smooth Animations** - Cubic-bezier transitions and hover effects
- **Gradient Themes** - Beautiful orange gradient color scheme
- **Mobile-First** - Touch-friendly interface with mobile menu
- **Dark Mode Support** - Automatic dark theme detection

### 📱 Responsive Components
- **Dynamic Navbar** - Adapts to scroll position with blur effects
- **Search Integration** - Centralized search functionality
- **Movie Grid** - Flexible grid layout with hover animations
- **Filter System** - Category-based movie filtering
- **Loading States** - Elegant loading animations and error handling

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/riqtariq/benflix.git
   cd vite-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install required packages**
   ```bash
   npm install lucide-react
   # or
   yarn add lucide-react
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see the app running.

## 📁 Project Structure

```
moviehub/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   └── MovieCard/
│   │       ├── MovieCard.jsx
│   │       └── MovieCard.css
│   ├── hooks/
│   │   └── useMovieSearch.js
│   ├── services/
│   │   └── movieAPI.js
│   ├── utils/
│   │   └── constants.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Lucide React** - Beautiful, customizable icons
- **CSS3** - Advanced styling with animations and responsive design
- **Google Fonts** - Poppins font family for modern typography

### Development
- **Create React App** - Zero-configuration setup
- **ES6+** - Modern JavaScript features
- **CSS Grid & Flexbox** - Modern layout techniques

## 🎨 Design System

### Color Palette
```css
Primary Orange: #ff9800
Secondary Orange: #ffa733
Light Orange: #ffb74d
Dark Background: #1c1c1c
Medium Background: #292929
Text Primary: #ffffff
Text Secondary: #cccccc
```

### Typography
- **Primary Font**: Poppins (Google Fonts)
- **Fallback**: Montserrat, sans-serif
- **Font Weights**: 300, 400, 500, 600, 700

### Breakpoints
```css
Mobile: 480px and below
Tablet: 768px and below
Desktop: 1024px and above
Large Desktop: 1400px and above
```

## 📱 Component Usage

### Navbar Component
```jsx
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      {/* Your app content */}
    </div>
  );
}
```

### Home Component
```jsx
import Home from './components/Home/Home';

function HomePage() {
  return <Home />;
}
```

## 🔧 Customization

### Changing Colors
Update the CSS custom properties in your main stylesheet:
```css
:root {
  --primary-color: #ff9800;
  --secondary-color: #ffa733;
  --background-dark: #1c1c1c;
  --background-medium: #292929;
}
```

### Adding New Navigation Links
Modify the `navLinks` array in `Navbar.jsx`:
```jsx
const navLinks = [
  { name: 'Home', href: '/', icon: Play },
  { name: 'Movies', href: '/movies', icon: Star },
  { name: 'Your Link', href: '/your-path', icon: YourIcon },
];
```

### Customizing Search Functionality
Update the `handleSearch` function in your home component:
```jsx
const handleSearch = async (query) => {
  // Your search logic here
  const results = await movieAPI.search(query);
  setMovies(results);
};
```

## 🌐 API Integration

### Movie Database Setup
1. Sign up for an API key from [TMDB](https://www.themoviedb.org/settings/api) or [OMDB](http://www.omdbapi.com/apikey.aspx)
2. Create a `.env` file in your project root:
   ```
   REACT_APP_MOVIE_API_KEY=your_api_key_here
   REACT_APP_API_BASE_URL=https://api.themoviedb.org/3
   ```
3. Use the API key in your service functions

### Example API Service
```jsx
// src/services/movieAPI.js
const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return response.json();
};
```

## 🎯 Performance Optimization

### Implemented Optimizations
- **Lazy Loading** - Components load only when needed
- **CSS Transitions** - Hardware-accelerated animations
- **Responsive Images** - Optimized image loading
- **Debounced Search** - Prevents excessive API calls
- **Memoization** - React.memo for expensive components

### Best Practices
- Use `React.memo` for movie cards
- Implement virtual scrolling for large lists
- Compress and optimize images
- Use CSS `will-change` for animations

## 📱 Mobile Features

### Touch Interactions
- **Swipe Navigation** - Touch-friendly menu interactions
- **Tap Feedback** - Visual feedback for all interactive elements
- **Responsive Touch Targets** - Minimum 44px touch areas

### Mobile Menu
- **Slide Animation** - Smooth right-to-left menu transition
- **Overlay Background** - Backdrop blur for focus
- **Touch Outside to Close** - Intuitive gesture support

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deployment Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use `gh-pages` package
- **Firebase Hosting**: Use Firebase CLI

## 🧪 Testing

### Component Testing
```jsx
// Example test for Navbar
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

test('renders MovieHub logo', () => {
  render(<Navbar />);
  const logo = screen.getByText(/MovieHub/i);
  expect(logo).toBeInTheDocument();
});
```

### Running Tests
```bash
npm test
# or
yarn test
```

## 🐛 Troubleshooting

### Common Issues

**Icons not displaying?**
- Ensure `lucide-react` is installed: `npm install lucide-react`

**Search not working?**
- Check your API key in the `.env` file
- Verify API endpoint URLs

**Styles not applying?**
- Ensure CSS files are imported correctly
- Check for CSS specificity conflicts

**Mobile menu not working?**
- Verify JavaScript is enabled
- Check for console errors

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Contribution Guidelines
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Authors

- benjamin ngumba gachanja - *benflix* - [riqtariqx](https://github.com/riqtariqx)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Lucide React](https://lucide.dev/) - Beautiful icon library
- [Google Fonts](https://fonts.google.com/) - Typography
- [The Movie Database](https://www.themoviedb.org/) - Movie data API

## 📊 Features Roadmap

### Upcoming Features
- [ ] User authentication and profiles
- [ ] Advanced filtering (genre, year, rating)
- [ ] Movie recommendations
- [ ] Watchlist and favorites sync
- [ ] Social features and reviews
- [ ] Offline mode support
- [ ] Progressive Web App (PWA)

### Current Version: 1.0.0
- [x] Movie search functionality
- [x] Responsive design
- [x] Modern UI components
- [x] Mobile navigation
- [x] Loading states and error handling

---

**Built with ❤️ and React**

For questions or support, please open an issue or contact [bennsachez21@gmail.com](mailto:gachanjabenjamin21@gmail.com)