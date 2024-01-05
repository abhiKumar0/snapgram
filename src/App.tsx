import { Routes, Route } from 'react-router-dom';

import './globals.css';
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout"
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import RootLayout from './_root/RootLayout'
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* Private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/all-users' element={<AllUsers />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:id' element={<EditPost />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/profile/:id/' element={<Profile />} />
          <Route path='/update-profile/:id' element={<UpdateProfile />} />

        </Route>
      </Routes>
      <Toaster />
    </main>
  )
}

export default App;



// "dependencies": {
//   "@hookform/resolvers": "^3.3.1",
//   "@radix-ui/react-label": "^2.0.2",
//   "@radix-ui/react-slot": "^1.0.2",
//   "@radix-ui/react-tabs": "^1.0.4",
//   "@radix-ui/react-toast": "^1.1.5",
//   "@tanstack/react-query": "^4.36.1",
//   "@tanstack/react-query-devtools": "^4.35.7",
//   "appwrite": "^13.0.0",
//   "attr-accept": "^2.2.2",
//   "class-variance-authority": "^0.7.0",
//   "clsx": "^2.0.0",
//   "eslint-config-prettier": "^9.0.0",
//   "eslint-config-standard": "^17.1.0",
//   "eslint-plugin-tailwindcss": "^3.13.0",
//   "lucide-react": "^0.279.0",
//   "prettier": "^3.0.3",
//   "react": "^18.2.0",
//   "react-dom": "^18.2.0",
//   "react-dropzone": "^14.2.3",
//   "react-hook-form": "^7.47.0",
//   "react-intersection-observer": "^9.5.2",
//   "react-router-dom": "^6.16.0",
//   "solidjs-dropzone": "^1.0.0",
//   "tailwind-merge": "^1.14.0",
//   "tailwindcss-animate": "^1.0.7",
//   "zod": "^3.22.4"
// },