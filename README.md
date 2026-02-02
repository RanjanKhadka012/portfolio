# Ranjan Khadka - Portfolio Website

A modern, responsive portfolio website built with Vite showcasing my experience as a Software Engineering student at the University of Minnesota Crookston.

## 🚀 Live Demo

Visit the live website: [https://ranjan-khadka.vercel.app/](url)
## 📋 Features

- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, scroll animations, and smooth navigation
- **Resume Download**: Downloadable resume functionality
- **Contact Information**: Easy ways to get in touch
- **Project Showcase**: Detailed project descriptions and technologies used
- **Skills Overview**: Comprehensive list of technical and soft skills

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Build Tool**: Vite 5.0
- **Framework**: Bootstrap 5.3.0
- **Icons**: Font Awesome 6.4.0
- **Hosting**: Vercel
- **Version Control**: Git/GitHub

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg         # Site favicon
│   └── Me.jpg             # Profile photo (add your image here)
├── src/
│   ├── main.js            # JavaScript entry point
│   └── style.css          # Custom CSS styles
├── index.html             # Main HTML file
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies and scripts
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

## 🚀 Development & Deployment

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RanjanKhadka012/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

### Deployment on Vercel

#### Method 1: Direct Vercel Deploy
1. **Push to GitHub**: Ensure your code is in a GitHub repository

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your portfolio repository

3. **Configure Settings**:
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be available at `https://your-project-name.vercel.app`

#### Method 2: CLI Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production
vercel --prod
```

### Environment Variables (if needed)
Create a `.env.local` file for environment variables:
```
VITE_API_URL=your_api_url_here
```

## 🎨 Features Overview

### Hero Section
- Professional introduction with contact information
- Call-to-action buttons for resume download and contact
- Direct link to LinkedIn profile
- Profile photo (add your `Me.jpg` to `/public/` directory)

### About Section
- Detailed objective and career goals
- Education information
- Leadership experience highlight

### Experience Timeline
- Current Software Engineering Intern position
- IT Technician role at university
- Leadership and management experience
- Point-of-sale operations experience

### Projects Showcase
- **Sustainability Online Marketplace**: Full-stack campus sustainability platform
- **Task Manager Web App**: CRUD-based task management system
- Technology stack badges for each project

### Skills Section
- **Technical Skills**: Programming languages, web development, databases, tools
- **Soft Skills**: Problem-solving, leadership, teamwork, communication

### Contact Section
- Multiple contact methods (email, phone, LinkedIn)
- Professional contact form (enhanced with JavaScript)

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Mobile devices** (320px and up)
- **Tablets** (768px and up)  
- **Desktop** (1024px and up)
- **Large screens** (1200px and up)

## ✨ Interactive Features

- **Smooth scrolling** navigation
- **Active section highlighting** in navigation
- **Scroll animations** for cards and timeline items
- **Hover effects** on buttons and cards
- **Resume download** functionality
- **Back to top** button
- **Loading animations** for better UX
- **Mobile-friendly** navigation menu

## 🎯 Performance Optimizations

- **Vite build optimization** for fast loading
- **Debounced scroll events** for better performance
- **Lazy loading animations** using Intersection Observer
- **Optimized images** with proper sizing
- **Tree shaking** and code splitting with Vite
- **CSS custom properties** for maintainable theming

## 🔧 Customization

### Adding Your Photo
1. Add your photo as `Me.jpg` in the `/public/` directory
2. The image will automatically be displayed in the hero section

### Updating Content
- Edit personal information in `index.html`
- Modify styles in `src/style.css`
- Add functionality in `src/main.js`

### Adding New Sections
1. Add HTML structure in `index.html`
2. Style in `src/style.css`
3. Add interactions in `src/main.js`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📞 Contact Information

- **Email**: Khadk046@crk.umn.edu
- **Phone**: (218) 275-0287
- **Location**: Crookston, MN
- **LinkedIn**: [linkedin.com/in/ranjan-khadka-181b461a5/](https://www.linkedin.com/in/ranjan-khadka-181b461a5/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

While this is a personal portfolio, feedback and suggestions are welcome! Feel free to:
- Open an issue for bugs or suggestions
- Submit a pull request for improvements
- Contact me directly for questions

---

**Built with ❤️ by Ranjan Khadka using Vite**
