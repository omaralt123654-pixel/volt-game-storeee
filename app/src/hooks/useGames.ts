import { useState, useEffect } from 'react';
import type { Game } from '../types/game';

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/games.json')
      .then(res => res.json())
      .then((data: Game[]) => {
        setGames(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { games, loading, error };
}
