import { useRef, useState } from "react";
//Icons
import { Icon } from "@iconify/react";

//Components
import NotificationItem from "./NotificationItem";

//Hooks

import { useGetNotifications } from "hooks/index.js";
import { useAuth } from "provider/AuthProvider";

function NotificationList() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  let timeout;
  const [filter, setFilter] = useState("all");
  const { user } = useAuth();

  const {
    data: notifications,
    isLoading,
    isError,
  } = useGetNotifications(user.userId);
  if (isLoading) return <div>isLoading</div>;

  const filteredNotifications =
    filter === "all" ? notifications : notifications.filter((n) => !n.read); // assuming you have a `read` field

  return (
    <div
      className="inline-block relative"
      ref={ref}
      onMouseEnter={() => {
        clearTimeout(timeout);
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        timeout = setTimeout(() => setIsOpen(false), 200);
      }}
    >
      <Icon
        icon="carbon:notification-filled"
        width={24}
        height={24}
        className="text-gray-500 hover:text-blue-500 transition-colors duration-200 cursor-pointer"
      />
      <span className="inline-flex -top-1 -right-1 absolute justify-center items-center bg-red-500 px-1.5 py-0.5 rounded-full font-bold text-white text-xs leading-none">
        3
      </span>

      {/* actual List*/}
      {isOpen && notifications && (
        <section
          className="z-50 absolute bg-white shadow-lg p-4 border border-orange-100 rounded-xl w-[400px]"
          style={{
            top: "120%",
            right: 0,
          }}
        >
          <p className="mb-3 font-semibold text-gray-900 text-lg">
            Notifications
          </p>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-4">
            <button
              className={`px-3 py-1 rounded-md font-medium transition ${
                filter === "all"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-orange-100 text-gray-800 hover:bg-orange-200"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              className={`px-3 py-1 rounded-md font-medium transition ${
                filter === "unread"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-orange-100 text-gray-800 hover:bg-orange-200"
              }`}
              onClick={() => setFilter("unread")}
            >
              Unread
            </button>
          </div>

          {/* Notification list */}
          <ul className="space-y-2 pr-1 max-h-96 overflow-y-auto">
            {filteredNotifications.map((n) => (
              <NotificationItem key={n.notificationId} notification={n} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default NotificationList;
