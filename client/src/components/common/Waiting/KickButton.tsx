import { KickIconComponent } from "../Icons/KickIcon";

export default function KickButton({ playerId }: { playerId: string }) {
    return (
    <button className="btn btn-danger btn-sm kick_player_btn" type="button" onClick={() => alert(playerId)}>
        <KickIconComponent />
    </button>);
}