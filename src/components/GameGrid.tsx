import { SimpleGrid, Text } from '@chakra-ui/react';
import useGames from '../hooks/useGames';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';
import GameCardcontainer from './GameCardcontainer';

const GameGrid = () => {
  const { games, error, isLoading } = useGames();
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        spacing={10}
        padding='10px'
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardcontainer>
              <GameCardSkeleton key={skeleton} />
            </GameCardcontainer>
          ))}
        {games.map((game) => (
          <GameCardcontainer>
            <GameCard key={game.id} game={game} />
          </GameCardcontainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
