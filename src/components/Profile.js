import React, { useState, useEffect, useCallback } from "react";
import Modal from "./Modal";

const Profile = () => {
  const bio = "𝐁𝐞𝐢𝐧𝐠 𝐡𝐚𝐩𝐩𝐲 𝐢𝐬 𝐤𝐧𝐨𝐰𝐢𝐧𝐠 𝐡𝐨𝐰 𝐭𝐨 𝐛𝐞 𝐜𝐨𝐧𝐭𝐞𝐧𝐭 𝐰𝐢𝐭𝐡 𝐥𝐢𝐭𝐭𝐥𝐞";

  const [photos, setPhotos] = useState([]);
  const [visiblePhotos, setVisiblePhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [discordPresence, setDiscordPresence] = useState(null);
  const photosPerPage = 9;

  const statusIcons = {
    online:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@v13.1.0/assets/72x72/1f7e2.png", // Green circle for "online"
    idle: "https://cdn.jsdelivr.net/gh/twitter/twemoji@v13.1.0/assets/72x72/1f7e1.png", // Yellow circle for "idle"
    dnd: "https://cdn.jsdelivr.net/gh/twitter/twemoji@v13.1.0/assets/72x72/1f534.png", // Red circle for "do not disturb"
    offline:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@v13.1.0/assets/72x72/26aa.png", // Gray circle for "offline/invisible"
  };

  useEffect(() => {
    const fetchPhotosAndPresence = async () => {
      setLoading(true);

      const fetchPhotos = () => {
        const fetchedPhotos = Array.from(
          { length: 27 },
          (_, i) => `https://picsum.photos/500?random=${i}`
        );
        return fetchedPhotos;
      };

      const fetchDiscordPresence = async () => {
        try {
          const response = await fetch(
            "https://api.lanyard.rest/v1/users/395904048982654987"
          );
          const data = await response.json();
          return data.data;
        } catch (error) {
          console.error("Error fetching Discord presence:", error);
          return null;
        }
      };

      const [photos, presence] = await Promise.all([
        fetchPhotos(),
        fetchDiscordPresence(),
      ]);

      setPhotos(photos);
      setVisiblePhotos(photos.slice(0, photosPerPage));
      setDiscordPresence(presence);
      setLoading(false);
    };

    fetchPhotosAndPresence();
  }, []);

  const loadMorePhotos = useCallback(() => {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      setVisiblePhotos(photos.slice(0, newPage * photosPerPage));
      return newPage;
    });
  }, [photos]);

  const handleImageClick = useCallback((imageSrc) => {
    setSelectedImage(imageSrc);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 dark:bg-gray-900 dark:text-white">
      {/* Main Profile Section */}
      <div className="flex flex-col md:flex-row items-center mb-8 relative">
        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-lg mb-4 md:mb-0 relative">
          {discordPresence && (
            <img
              src={`https://cdn.discordapp.com/avatars/${discordPresence.discord_user.id}/${discordPresence.discord_user.avatar}.png?size=128`}
              alt="Discord Profile"
              className="object-cover w-full h-full"
            />
          )}
        </div>
        {discordPresence && (
          <img
            src={
              statusIcons[discordPresence.discord_status] || statusIcons.offline
            }
            alt={`${discordPresence.discord_status} status`}
            className="w-8 h-8 rounded-full absolute translate-x-14 translate-y-20 md:translate-x-32 md:translate-y-6 bg-white"
          />
        )}
        <div className="text-center md:text-left md:ml-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            {discordPresence?.discord_user.display_name ||
              discordPresence?.discord_user.username}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{bio}</p>
          {/* Social Icons */}
          <div className="flex justify-center md:justify-start mt-4 space-x-4">
            <a
              href="https://www.instagram.com/kenzi.vrc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png"
                alt="Instagram"
                className="w-6 h-6 dark:invert"
              />
            </a>
            <a
              href="https://discord.com/users/395904048982654987"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/discord-logo.png"
                alt="Discord"
                className="w-6 h-6 dark:invert"
              />
            </a>
            <a
              href="https://steamcommunity.com/id/letsmakecakes/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Steam"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/steam.png"
                alt="Steam"
                className="w-6 h-6 dark:invert"
              />
            </a>
            <a
              href="https://open.spotify.com/user/7hqx6yxcc92tzcmu95e7p8082?si=78e29edeb7c84006"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/spotify.png"
                alt="Spotify"
                className="w-6 h-6 dark:invert"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
        {visiblePhotos.map((photo, index) => (
          <div
            key={index}
            className="relative w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleImageClick(photo)}
          >
            <img
              src={photo}
              alt={`Random photo ${index + 1}`}
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-70 p-2">
              <p className="text-white text-sm">Post {index + 1}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Loading and Load More Button */}
      {loading ? (
        <div className="text-center py-4">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        visiblePhotos.length < photos.length && (
          <div className="text-center py-4">
            <button
              onClick={loadMorePhotos}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Load More
            </button>
          </div>
        )
      )}

      <Modal
        isOpen={selectedImage !== null}
        onClose={closeModal}
        imageSrc={selectedImage}
      />
    </div>
  );
};

export default Profile;
