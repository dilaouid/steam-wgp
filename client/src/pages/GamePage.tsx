import { useContext, useState } from "react";

import { Room } from "../context";
import { useWebSocket } from "../context/useWebSocket";
import { HeartIcon } from "../components/common/Icons/HeartIcon";
type Swipe = 'up' | 'left' | 'right' | 'down';

export default function GamePage () {
    const { room, setRoom } = useContext(Room.Context)!;
    const [ index, setIndex ] = useState<number>(0);
    const socket = useWebSocket();

    if (!room || !socket) return <></>;

    const swiped = (direction: Swipe, game: number) => {
        if (!socket.socket || !room || !game) return;
        if (direction === 'up') {
            socket?.socket.send(JSON.stringify({ action: 'swipe', gameId: game }));
            // Update room state to remove swiped game
            setRoom(prevRoom => {
                // Si prevRoom est null, on retourne null.
                if (!prevRoom) return null;
                
                // Autrement, on retourne un nouvel objet avec les propriétés mises à jour.
                return {
                    ...prevRoom,
                    commonGames: prevRoom.commonGames.filter(g => g !== game),
                    swipedGames: prevRoom.swipedGames ? [...prevRoom.swipedGames, game] : [game]
                };
            });
              
        } else if (direction === 'left') {
            // Reorder the commonGames array to move swiped game to the end
            /* setRoom(prevRoom => {
                if (!prevRoom) return null;

                return {
                    ...prevRoom,
                    commonGames: prevRoom.commonGames.filter(g => g !== game).concat(game)
                }
            }); */
        }
        setIndex(prevIndex => prevIndex + 1);
    }

    const swipeLeft = (game: number) => {
        swiped('left', game);
    };

    const swipeUp = (game: number) => {
        swiped('up', game);
    };

    const getGameIndex = (game: number) => {
        return room.commonGames.indexOf(game);
    };

    return (
        <div className="game-page-container">
            <div className="card-stack" style={{
                        transform: `translateY(${index * -700}px)`,
                    }}>
                {room.commonGames.map((game:number, idx:number) => (
                    <div key={game} >
                        <div
                            className={`card ${index === getGameIndex(game) ? 'active' : ''}`}
                            style={{
                                backgroundImage: `url(https://steamcdn-a.akamaihd.net/steam/apps/${game}/library_600x900.jpg)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    </div>
                ))}
            </div>
            <div className="action-buttons">
                <button className="btn btn-success btn-lg" onClick={() => swipeUp(room.commonGames[0])} style={{width:250+'px', margin: 10+'px'}}>
                    <HeartIcon /> J'aime !
                </button>
                <button className="btn btn-outline-danger btn-lg" onClick={() => swipeLeft(room.commonGames[0])} style={{width:250+'px', margin: 10+'px'}}>
                    Pas intéressé
                </button>
            </div>
        </div>
    );
}
