import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import {Toaster} from 'react-hot-toast'

// Pages
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Messages from "./pages/Messages";
import Connections from "./pages/Connections";
import ChatBox from "./pages/ChatBox";
import CreatePost from "./pages/CreatePost";
import Discover from "./pages/Discover";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Toaster/>
      {/* Public routes (only visible if not signed in) */}
      <SignedOut>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </SignedOut>

      {/* Protected routes (only visible if signed in) */}
      <SignedIn>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Feed />} />
            <Route path="messages" element={<Messages />} />
            <Route path="messages/:userId" element={<ChatBox />} />
            <Route path="connections" element={<Connections />} />
            <Route path="discover" element={<Discover />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:profileId" element={<Profile />} />
            <Route path="create-post" element={<CreatePost />} />
          </Route>
        </Routes>
      </SignedIn>
    </>
  );
};

export default App;
