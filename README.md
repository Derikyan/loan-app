# Loan Application Form

A modern multi-step loan application form built with React, TypeScript, and Tailwind CSS.

## Features
- 3-Step Application Process (Personal info → Address → Loan parameters)
- Real-time input validation
- Responsive mobile-friendly design
- Form state persistence
- Success confirmation modal
- Error handling and recovery

## Installation
1. Clone the repository:
git clone https://github.com/yourusername/loan-application.git
cd loan-application

2. Install dependencies:
npm install
or
yarn install

## Running the Application
Start development server:
npm run dev
or
yarn dev

Access at: http://localhost:3000

## Testing Guide

### Manual Tests
1. Step 1 - Personal Information:
   • Try invalid phone formats (should auto-format to 0XXX XXX XXX)
   • Test special characters in name fields (should show error)
   • Verify gender selection is required

2. Step 2 - Address & Employment:
   • Test workplace dropdown loads options
   • Submit with empty address (should prevent continuation)

3. Step 3 - Loan Parameters:
   • Adjust sliders and verify real-time updates
   • Submit valid form (should show confirmation modal)

## Build & Deployment
Create production build:
npm run build
or
yarn build

Local production preview:
npm run preview
or
yarn preview

## Project Structure
src/

├── api/               # API services

├── components/        # UI components

├── hooks/             # useForm, useFetch, etc.

├── pages/             # Form steps

├── App.tsx            # Root component

└── main.tsx           # App entry point

## Key Dependencies
Frontend:
• React 18
• TypeScript 5
• Tailwind CSS 3
• React Hook Form 7
• React Router 6

Development:
• Vite 4
• ESLint
• Prettier
• Jest (Testing)

## Support
For issues, please:
1. Check browser console for errors
2. Verify network requests in DevTools
3. Clear application cache
4. Open GitHub issue with reproduction steps
   
