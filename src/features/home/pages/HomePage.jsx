// Images
import BgImage from "assets/sonicHero.webp";
import HeroImage from "features/home/components/HeroImage";

//Component
import Spinner from "components/Spinner";
import GameList from "features/home/components/GameList";
import { useFeaturedGames, useStaffPicks, useTrendingGames } from "../hooks";

function HomePage() {
  const {
    data: trendingGames,
    isLoading: loadingTrending,
    isError: trendingError,
    error: trendingErrorObj,
  } = useTrendingGames();

  const {
    data: staffPicks,
    isLoading: loadingStaffPicks,
    isError: staffPicksError,
    error: staffPicksErrorObj,
  } = useStaffPicks();

  const {
    data: featuredGames,
    isLoading: loadingFeaturedGames,
    isError: featuredGamesError,
    error: featuredGamesErrorObj,
  } = useFeaturedGames();

  if (loadingTrending || loadingStaffPicks || loadingFeaturedGames)
    return <Spinner />;
  if (trendingError)
    return <p>Error loading trending games: {trendingErrorObj.message}</p>;
  if (staffPicksError)
    return <p>Error loading staff picks: {staffPicksErrorObj.message}</p>;
  if (featuredGamesError)
    return <p>Error loading staff picks: {featuredGamesErrorObj.message}</p>;
  return (
    <div>
      <HeroImage
        image={BgImage}
        title="Find a game and share a review with the community"
      />
      <div className="flex flex-col gap-10 mx-auto p-20 max-w-[1700px]">
        <GameList header="Trending" games={trendingGames} />
        <GameList header="Featured Games" games={featuredGames} />
        <GameList header="Staff Picks" games={staffPicks} />
      </div>
    </div>
  );
}

export default HomePage;
