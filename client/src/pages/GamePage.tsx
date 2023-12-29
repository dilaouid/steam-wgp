import { useContext, useState } from "react";

import { Room, WebSocket } from "../context";
import { HeartIcon } from "../components/common/Icons/HeartIcon";
import { swipeCard } from "../api/websocket";

export default function GamePage () {
    const { room, setRoom } = useContext(Room.Context)!;
    const [ index, setIndex ] = useState<number>(0);
    const socket = useContext(WebSocket.Context)!;

    if (!room || !socket) return <></>;

    const swipe = (like: boolean, game: number) => {
        if (!socket.socket || !room || !game) return;
        if (like) {
            swipeCard(socket.socket, game);
            setRoom(prevRoom => {
                if (!prevRoom) return null;
                
                return {
                    ...prevRoom,
                    commonGames: prevRoom.commonGames.filter(g => g !== game),
                    swipedGames: prevRoom.swipedGames ? [...prevRoom.swipedGames, game] : [game]
                };
            });
            if (index === room.commonGames.length - 1) {
                setIndex(0);
            }
        } else {
            setIndex(prevIndex => (prevIndex + 1) % room.commonGames.length);
        }
    }

    const getGameIndex = (game: number) => {
        return room.commonGames.indexOf(game);
    };

    return (
        <div className="game-page-container">
            <div className="card-stack" style={{
                        transform: `translateY(${index * -700}px)`,
                    }}>
                {room.commonGames.map((game:number) => (
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
                <button className="btn btn-danger btn-lg" onClick={() => swipe(true, room.commonGames[index])}>
                    <HeartIcon /> J'aime !
                </button>
                <button className="btn btn-outline-warning btn-lg" onClick={() => swipe(false, room.commonGames[index])}>
                    Pas intéressé
                </button>
                <p className="text-light">Aimez ou ignorez les jeux affichés. Le premier jeu qui aura été aimé par tout les joueurs de la room sera affiché, et vous saurez comment gaspiller les prochaines heures de votre précieuse vie.</p>
            </div>
        </div>
    );
}