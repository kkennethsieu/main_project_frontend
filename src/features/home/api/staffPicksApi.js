export const fetchStaffPicks = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_CATALOG_API}/games/lists/staff-picks`
  );
  if (!res.ok) throw new Error("Failed to fetch staff picks games");
  return res.json();
};
