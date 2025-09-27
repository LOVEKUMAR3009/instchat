import { BadgeCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const StoryViewer = ({ viewStory, setViewStory }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer, progressInterval;
    if (viewStory && viewStory.media_type !== "video") {
      setProgress(0);
      const duration = 10000;
      const stepTime = 10;
      let elapsed = 0;
      progressInterval = setInterval(() => {
        elapsed += stepTime;
        setProgress((elapsed / duration) * 100);
      }, stepTime);

      // close story
      timer = setTimeout(() => {
        setViewStory(null);
      }, duration + 300);
    }
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [viewStory, setViewStory]);
  const handleClose = () => {
    setViewStory(null);
  };

  if (!viewStory) {
    return null;
  }
  const renderContent = () => {
    switch (viewStory.media_type) {
      case "image":
        return (
          <img
            src={viewStory.media_url}
            alt=""
            className="max-w-full max-h-screen  object-contain"
          />
        );
        break;

      case "video":
        return (
          <video
            onEnded={() => setViewStory(null)}
            src={viewStory.media_url}
            alt=""
            className="max-w-full max-h-screen  object-contain"
            controls
            autoPlay
          />
        );
        break;

      case "text":
        return <div>{viewStory.content}</div>;
        break;
      default:
        return null;
    }
  };
  return (
    <div
      className="fixed inset-0  h-screen bg-black bg-opacity-90 z-110 flex items-center justify-center"
      style={{
        backgroundColor:
          viewStory.media_type === "text"
            ? viewStory.background_color
            : "#000000",
      }}
    >
      {/* progress bar */}
      {
        viewStory && viewStory.media_type !== "video" &&(

      <div className="absolute top-2 w-[96%] overflow-hidden rounded-sm h-1 bg-gray-700">
        <div
          className="h-full bg-white transition-all duration-100 linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
        )
      }

      {/* User info */}
      <div className="absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 sm:p-4 sm:px-8   rounded 50 ">
        <img
          src={viewStory.user?.profile_picture}
          alt=""
          className="size-7 sm:size-8 rounded-full object-cover border border-white"
        />
        <div className="text-white font-medium flex items-center gap-1.5">
          <span>{viewStory.user?.full_name}</span>
          <BadgeCheck size={18} className="text-blue-500" />
        </div>
      </div>

      {/* // close button */}

      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none"
      >
        <X className="w-8 h-8 hover:scale-110 transition cursor-pointer" />
      </button>

      {/* content of the story */}
      <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default StoryViewer;
