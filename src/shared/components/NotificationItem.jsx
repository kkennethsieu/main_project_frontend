export default function NotificationItem({ notification }) {
  const date = new Date(notification.createdAt);
  date.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });

  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
        notification.isRead ? "bg-white" : "bg-orange-50"
      }`}
    >
      {/* Avatar container */}
      <div className="relative flex-shrink-0">
        {notification.senderAvatarURL && (
          <img
            src={notification.senderAvatarURL}
            alt="Sender avatar"
            className="rounded-full w-10 h-10"
          />
        )}
        {/* Notification type icon badge */}
        <span className="right-0 bottom-0 absolute flex justify-center items-center bg-orange-500 border-2 border-white rounded-full w-5 h-5 text-white text-xs">
          {notification.type === "friend_request" && "👤"}
          {notification.type === "review_liked" && "👍"}
          {notification.type === "review_disliked" && "👎"}
          {notification.type === "comment" && "💬"}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-gray-800">{notification.message}</p>
        <span className="text-gray-500 text-xs">
          {new Date(notification.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
