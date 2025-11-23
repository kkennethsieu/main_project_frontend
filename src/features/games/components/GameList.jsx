import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

//Components
import GameCard from "components/GameCard";
import Pagination from "components/Pagination";

function GameList({ header, games }) {
  const [currentPage, setCurrentPage] = useState(1);

  // When we fetch we need to change all this
  // const [reviews, setReviews] = useState([fakeReviews]);
  // const [totalPages, setTotalPages] = useState(1);
  const limit = 4;

  const totalPages = Math.ceil(games?.length / limit);

  const currentGames = games?.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  return (
    <div className="space-y-6">
      <section className="flex justify-between">
        <h2 className="font-bold text-3xl">{header}</h2>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </section>
      <motion.div
        className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        key={currentPage}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
      >
        {currentGames?.map((game) => (
          <Link to={`/game/${game.id}`}>
            <GameCard key={game.id} game={game} />
          </Link>
        ))}
      </motion.div>
    </div>
  );
}

export default GameList;
