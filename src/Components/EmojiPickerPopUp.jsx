import { Image, X } from "lucide-react";
import React from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopUp = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);

    const handleEmojiClick = (emoji) =>{
        onSelect(emoji?.imageUrl || emoji?.emoji || "")
        setIsOpen(false);
    }
  return (
    <div className="flex flex-col gap-3 mb-6">
      {/* Trigger */}
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 cursor-pointer"
      >
        {/* Icon Preview */}
        <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-2xl shadow">
          {icon ? (
            <img src={icon} alt="icon" className="w-10 h-10 rounded-full" />
          ) : (
            <Image className="w-6 h-6" />
          )}
        </div>

        {/* Text */}
        <p className="text-sm font-medium text-gray-700">
          {icon ? "Change icon" : "Pick icon"}
        </p>
      </div>

      {/* Emoji Picker Popup */}
      {isOpen && (
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 shadow-sm rounded-full absolute -top-3 -right-3 z-10 hover:bg-gray-100 transition"
          >
            <X size={14} className="text-gray-600" />
          </button>

          {/* Picker */}
          <div className="shadow-lg rounded-lg border border-gray-200 bg-white z-20">
            <EmojiPicker
              open={isOpen}
              onEmojiClick={handleEmojiClick
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopUp;
