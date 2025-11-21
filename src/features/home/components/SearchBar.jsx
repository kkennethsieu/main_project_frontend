import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

//Components
import SearchQuery from "./SearchQuery";
//Hooks
import { useSearchGames } from "../hooks";
import { useDebounce } from "hooks/useDebounce";

const SearchBar = ({ placeholder = "Search..." }) => {
  const [searchQuery, setSearchQuery] = useState();

  const debouncedQuery = useDebounce(searchQuery, 500);
  const { data: searchedGames = [], isLoading } =
    useSearchGames(debouncedQuery);

  return (
    <>
      <div className="relative w-full max-w-md">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="py-2 pr-4 pl-10 border border-gray-300 focus:border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <MagnifyingGlassIcon className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform" />
        </div>
        {searchedGames?.length > 0 && (
          <div className="z-10 absolute bg-white shadow-lg mt-1 border border-gray-200 rounded-lg divide-y w-full">
            {searchedGames.map((game) => (
              <SearchQuery key={game.id} game={game} />
            ))}
          </div>
        )}
        {debouncedQuery && (
          <div className="z-10 absolute bg-white shadow-lg mt-1 border border-gray-200 rounded-lg divide-y w-full">
            {isLoading ? (
              <p className="p-2">Loading...</p>
            ) : searchedGames.length > 0 ? (
              searchedGames.map((game) => (
                <SearchQuery key={game.id} game={game} />
              ))
            ) : (
              <p className="p-2">No results found</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
