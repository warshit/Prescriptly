# Prescriptly 🏥

A modern healthcare application that leverages AI to help users manage prescriptions, check symptoms, and access medical information with precision and ease.

![Prescriptly Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## Features ✨

- **Prescription Scanner**: Upload and analyze prescriptions using AI
- **Medicine Catalog**: View detailed information about medications
- **Symptom Checker**: Check your symptoms and get preliminary insights
- **Shopping Cart**: Save and manage your medicine list
- **User Authentication**: Secure access to your medical information

## Tech Stack 🛠️

- **Frontend**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 6.2.0
- **AI Integration**: Google's Generative AI (@google/genai)
- **Authentication**: Firebase
- **Styling**: Tailwind CSS

## Prerequisites 📋

Before you begin, ensure you have the following installed:
- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

## Getting Started 🚀

1. **Clone the repository**
   ```bash
   git clone https://github.com/warshit/Prescriptly.git
   cd medical-precision
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure 📁

```
medical-precision/
├── components/         # React components
│   ├── About.tsx      # About page
│   ├── Auth.tsx       # Authentication component
│   ├── Cart.tsx       # Shopping cart
│   ├── Header.tsx     # Navigation header
│   ├── Home.tsx       # Home page
│   └── SymptomChecker.tsx # Symptom checker
├── services/          # Service integrations
│   ├── AuthContext.tsx    # Authentication context
│   ├── firebaseConfig.ts  # Firebase configuration
│   └── geminiService.ts   # Gemini AI service
├── types.ts           # TypeScript type definitions
├── App.tsx           # Main application component
└── vite.config.ts    # Vite configuration
```

## Key Features in Detail 🔍

### 1. Prescription Scanner
- Upload prescription images
- AI-powered medicine detection using Google's Gemini AI
- Automatic information extraction including dosage and frequency

### 2. Symptom Checker
- Interactive symptom assessment
- Preliminary health insights
- User-friendly interface for symptom input

### 3. Medicine Management
- Detailed medicine information
- Shopping cart functionality
- Easy medicine search and filtering

## Security 🔒

- Secure authentication using Firebase
- Protected routes for authenticated users
- Secure environment variable handling
- Data encryption in transit

## Development 👩‍💻

The application is built with modern web technologies and best practices:
- TypeScript for type safety
- React hooks for state management
- Modular component architecture
- Responsive design with Tailwind CSS

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Disclaimer ⚠️

This application is for demonstration purposes only. Always consult healthcare professionals for medical advice and prescriptions.

## License 📝

This project is proprietary software. All rights reserved.

## Support 💬

For support, please open an issue in the repository or contact the maintainers.

---
Made with ❤️ by [warshit](https://github.com/warshit)
