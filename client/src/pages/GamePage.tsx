import { useContext, useEffect, useState } from "react";

import { Room, WebSocket } from "../context";
import { HeartIcon } from "../components/common/Icons/HeartIcon";
import { swipeCard, unswipeCard } from "../api/websocket";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import './GamePage.css';

export default function GamePage () {
    const { room, setRoom } = useContext(Room.Context)!;
    const [ index, setIndex ] = useState<number>(0);
    const [ animate, setAnimate ] = useState(false);
    const socket = useContext(WebSocket.Context)!;

    const { t } = useTranslation();

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
        unswipeCard(socket.socket, game);
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
            <button className={`btn btn-${room.commonGames.length === 0 ? 'disabled' : 'danger'} btn-lg`} onClick={() => swipe(true, room.commonGames[index])} disabled={room.commonGames.length === 0}>
                <HeartIcon /> {t('i_like')}
            </button>
            <button className={`btn btn-outline-${room.commonGames.length === 0 ? 'disabled' : 'warning'} btn-lg`} onClick={() => swipe(false, room.commonGames[index])} disabled={room.commonGames.length === 0}>
                {t('not_interesting')}
            </button>
            <p className="text-light">{t('game_instructions')}</p>
            <p className="text-info-emphasis"><Spinner color={"info"} size="sm" /> {t('game_countdown')}</p>
        </div>
        <div className="game-page-background-container">
            { room.swipedGames?.length > 0 ? <h5 className="text-warning-emphasis">{t('click_to_remove_like')}</h5> : <> </> }
            { room.swipedGames?.map((game: number) => (
                <img key={game} src={`https://steamcdn-a.akamaihd.net/steam/apps/${game}/header.jpg?t=1628007606`} alt="Swipped game" className="game-page-background" onClick={() => unlike(game)} />
            ))}
        </div>
    </div> : <div className="victory align-self-center d-flex justify-content-center">
        <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${room.winner}/library_600x900.jpg`} className={animate ? 'animate' : ''}  />
        </div> }
    </div>
        
    );
}