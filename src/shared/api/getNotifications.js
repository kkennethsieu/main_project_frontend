import mockNotifications from "../mock/notifications.json";
export const fetchNotifications = async (userId) => {
  if (import.meta.env.VITE_USE_MOCKS === "true") {
    const mockData = mockNotifications.filter(
      (notify) => notify.receiverId == userId
    );
    console.log(mockData);
    return mockData;
  }
  const res = await fetch(
    `${
      import.meta.env.VITE_GATEWAY_API
    }/api/notification/notify/notifications/${userId}`
  );
  if (!res.ok) throw new Error("Error fetching notifications with user");

  const data = await res.json();
  return data.data;
};
