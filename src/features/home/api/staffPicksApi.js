import staffMock from "../mock/staffPicks";

export const fetchStaffPicks = async () => {
  if (import.meta.env.VITE_USE_MOCKS === "true") {
    return staffMock;
  }

  const res = await fetch(
    `${import.meta.env.VITE_GATEWAY_API}/api/games/games/lists/staff-picks`
  );
  if (!res.ok) throw new Error("Failed to fetch staff picks games");
  const data = await res.json();
  return data.staffPicks;
};
