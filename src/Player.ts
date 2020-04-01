
export enum PlayerStatus { "ready", "active", "falstart" };
class Player {
    status: PlayerStatus = PlayerStatus.ready;
    label: string = "";
    constructor(label: string) {
        this.label = label;
    }
}
export default Player;