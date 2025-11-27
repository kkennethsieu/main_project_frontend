export const fetchNotifications = async (userId) => {
  const res = await fetch(
    `${import.meta.env.VITE_NOTIFY_API}/notify/notifications/${userId}`
  );
  if (!res.ok) throw new Error("Error fetching notifications with user");

  const data = await res.json();
  return data;
};
