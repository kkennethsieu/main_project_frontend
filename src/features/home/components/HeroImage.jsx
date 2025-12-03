import SearchBar from "./SearchBar";

const HeroImage = ({ image, title, subtitle, textAlign = "center" }) => {
  let alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <section className="relative w-full h-64 md:h-96 lg:h-[550px]">
      <img
        src={image}
        srcSet={`${image}?w=768 768w, ${image}?w=1280 1280w, ${image}?w=1920 1920w`}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1920px"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      <div
        className={`relative z-10 flex flex-col justify-center h-full px-4 gap-4 ${alignmentClasses[textAlign]}`}
      >
        <h3 className="font-arvo font-semibold text-gray-100 text-2xl">
          {title}
        </h3>
        {subtitle && <p className="mt-2 max-w-xl text-gray-200">{subtitle}</p>}
        <SearchBar />
      </div>
    </section>
  );
};

export default HeroImage;
