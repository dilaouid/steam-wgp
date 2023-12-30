import { useContext, useEffect, useState } from "react";

import { Room, WebSocket } from "../context";
import { HeartIcon } from "../components/common/Icons/HeartIcon";
import { swipeCard } from "../api/websocket";
import { Spinner } from "react-bootstrap";

export default function GamePage () {
    const { room, setRoom } = useContext(Room.Context)!;
    const [ index, setIndex ] = useState<number>(0);
    const [animate, setAnimate] = useState(false);
    const socket = useContext(WebSocket.Context)!;

    useEffect(() => {
        if (room?.winner) {
            setTimeout(() => {
                setAnimate(true);
            }, 1000);
        }
    }, [room?.winner])

    if (!room || !socket) return <></>;


    const swipe = (like: boolean, game: number) => {
        if (!socket.socket || !room || !game) return;
        if (like) {
            setRoom(prevRoom => {
                if (!prevRoom) return null;
                
                return {
                    ...prevRoom,
                    commonGames: prevRoom.commonGames.filter(g => g !== game),
                    swipedGames: prevRoom.swipedGames ? [...prevRoom.swipedGames, game] : [game]
                };
            });
            swipeCard(socket.socket, game);
            if (index === room.commonGames.length - 1) {
                setIndex(0);
            }
        } else {
            setIndex(prevIndex => (prevIndex + 1) % room.commonGames.length);
        }
    }

    const unlike = (game: number) => {
        if (!socket.socket || !room || !game) return;
        setRoom(prevRoom => {
            if (!prevRoom) return null;
            
            return {
                ...prevRoom,
                // put the game back in the commonGames array in the current index
                commonGames: [...prevRoom.commonGames.slice(0, index), game, ...prevRoom.commonGames.slice(index)],
                swipedGames: prevRoom.swipedGames?.filter(g => g !== game)
            };
        });
    }

    const getGameIndex = (game: number) => {
        return room.commonGames.indexOf(game);
    };

    return (
        <div className="container">
        { !room.ended ?<div className="game-page-container">
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
            <p className="text-info-emphasis"><Spinner color={"info"} size="sm" /> La room sélectionnera un jeu aléatoire 5 minutes après sa création si aucun choix n'a pas été fait ...</p>
        </div>
        <div className="game-page-background-container">
            { room.swipedGames?.length > 0 ? <h5 className="text-warning-emphasis">Cliquez sur un jeu pour le retirer de vos J'aimes</h5> : <> </> }
            {room.swipedGames?.map((game: number) => (
                <img key={game} src={`https://steamcdn-a.akamaihd.net/steam/apps/${game}/header.jpg?t=1628007606`} alt="Swipped game" className="game-page-background" onClick={() => unlike(game)} />
            ))}
        </div>
    </div> : <div className="victory align-self-center d-flex justify-content-center">
        <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${room.winner}/library_600x900.jpg`} className={animate ? 'animate' : ''}  />
        </div> }
    </div>
        
    );
}