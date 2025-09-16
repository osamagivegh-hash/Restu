# Golden Dragon - Oriental Restaurant Landing Page

A full-stack Oriental Restaurant Landing Page built with Next.js frontend and Express.js + MongoDB Atlas backend.

## 🚀 Features

### Frontend (Next.js)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI/UX**: Luxury design with smooth animations
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Cards
- **Performance**: Optimized images and lazy loading
- **Accessibility**: WCAG compliant components

### Backend (Express.js + MongoDB)
- **RESTful API**: Clean and well-documented endpoints
- **File Upload**: CV upload functionality with validation
- **Data Validation**: Input sanitization and validation
- **Security**: Rate limiting, CORS, and Helmet protection
- **Database**: MongoDB Atlas integration with Mongoose

### Sections
- **Hero Section**: Stunning food imagery with call-to-action
- **About Us**: Restaurant story and values
- **Menu Preview**: Featured dishes with categories
- **Careers**: Job application form with CV upload
- **Contact**: Contact form and restaurant information
- **Footer**: Links, social media, and newsletter signup

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Hook Form** - Form handling
- **Axios** - HTTP client

### Backend
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **Multer** - File upload handling
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### 1. Clone the repository
```bash
git clone <repository-url>
cd landpage2
```

### 2. Install dependencies
```bash
npm run install:all
```

### 3. Environment Setup

#### Frontend
```bash
cd frontend
cp env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

#### Backend
```bash
cd backend
cp env.example .env
```

Edit `.env`:
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/oriental-restaurant?retryWrites=true&w=majority
```

### 4. MongoDB Atlas Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get the connection string and update `MONGODB_URI`

## 🚀 Development

### Start both frontend and backend
```bash
npm run dev
```

### Start individually
```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

### Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## 📁 Project Structure

```
landpage2/
├── frontend/                 # Next.js frontend
│   ├── app/                 # App router
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # React components
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── MenuPreview.tsx
│   │   ├── Careers.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── package.json
│   └── tailwind.config.js
├── backend/                 # Express.js backend
│   ├── models/              # Mongoose models
│   │   ├── Contact.js
│   │   └── Career.js
│   ├── routes/              # API routes
│   │   ├── contact.js
│   │   └── careers.js
│   ├── uploads/             # File uploads
│   ├── server.js            # Main server file
│   └── package.json
├── package.json             # Root package.json
├── vercel.json              # Vercel deployment config
├── render.yaml              # Render deployment config
└── README.md
```

## 🔌 API Endpoints

### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (Admin)
- `GET /api/contact/:id` - Get specific contact
- `PATCH /api/contact/:id` - Update contact status

### Career Applications
- `POST /api/careers` - Submit job application
- `GET /api/careers` - Get all applications (Admin)
- `GET /api/careers/:id` - Get specific application
- `GET /api/careers/:id/cv` - Download CV file
- `PATCH /api/careers/:id` - Update application status
- `DELETE /api/careers/:id` - Delete application

### Health Check
- `GET /api/health` - Server health status

## 🚀 Deployment

### Vercel (Frontend)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Render (Backend)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set environment variables
4. Deploy automatically on push

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
FRONTEND_URL=https://your-frontend-domain.com
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com
```

## 🎨 Customization

### Colors
Edit `frontend/tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  primary: { /* Your primary colors */ },
  gold: { /* Your gold colors */ },
  dark: { /* Your dark colors */ }
}
```

### Content
- Update restaurant information in components
- Replace placeholder images with actual photos
- Modify menu items in `MenuPreview.tsx`
- Update job openings in `Careers.tsx`

### Styling
- Modify `frontend/app/globals.css` for global styles
- Update component styles in individual files
- Add custom animations with Framer Motion

## 🔒 Security Features

- **Rate Limiting**: Prevents spam and abuse
- **Input Validation**: Sanitizes all user inputs
- **File Upload Security**: Validates file types and sizes
- **CORS Protection**: Configurable cross-origin policies
- **Helmet**: Security headers for protection
- **Environment Variables**: Sensitive data protection

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🧪 Testing

### Manual Testing
1. Test all form submissions
2. Verify file uploads work correctly
3. Check responsive design on different devices
4. Test navigation and smooth scrolling
5. Validate all external links

### API Testing
Use tools like Postman or curl to test API endpoints:
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"General","message":"Test message"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: info@goldendragon.com

## 🎯 Future Enhancements

- [ ] Admin dashboard for managing applications
- [ ] Email notifications for form submissions
- [ ] Online reservation system
- [ ] Menu management system
- [ ] Customer reviews and ratings
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Progressive Web App (PWA) features

---

Built with ❤️ for Golden Dragon Restaurant

