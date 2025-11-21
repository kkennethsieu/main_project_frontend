// components/Spinner.jsx
export default function Spinner({
  size = "w-12 h-12",
  color = "border-orange-500",
}) {
  return (
    <div className="flex justify-center items-center py-8">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${color} ${size}`}
      ></div>
    </div>
  );
}
