import { SimpleGrid, Text } from '@chakra-ui/react';
import useGames, { Platform } from '../hooks/useGames';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';
import GameCardcontainer from './GameCardcontainer';
import { Genre } from '../hooks/useGenres';

interface Props {
  selectedGenre: Genre | null;
  selectedPlatform: Platform | null;
}

const GameGrid = ({ selectedGenre, selectedPlatform }: Props) => {
  const { data, error, isLoading } = useGames(selectedGenre, selectedPlatform);
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        spacing={3}
        padding='10px'
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardcontainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardcontainer>
          ))}
        {data.map((game) => (
          <GameCardcontainer key={game.id}>
            <GameCard game={game} />
          </GameCardcontainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
