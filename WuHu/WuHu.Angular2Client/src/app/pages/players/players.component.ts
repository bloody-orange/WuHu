import {Component, OnInit, OnDestroy} from '@angular/core';
import {Player} from "../../model/Player";
import {RestoreService} from "../../services/restore.service";
import {PlayerService} from "../../api/player-service";
import {UserService} from "../../services/user.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.sass']
})
export class PlayersComponent implements OnInit, OnDestroy {
    private players: Player[];
    private errorMessage: string;
    private successMessage: string;
    private loading: boolean = true;
    private editMode: boolean = true;

    constructor(private playerService: PlayerService,
                private userService: UserService,
                private sanitizer: DomSanitizer,
                private restoreService: RestoreService<Player>) {
    }

    private displayError(message: string) {
        this.errorMessage = message;
        this.successMessage = "";
        setTimeout(() => this.errorMessage = "", 5000)
    }

    private displaySuccess(message: string) {
        this.errorMessage = "";
        this.successMessage = message;
        setTimeout(() => this.successMessage = "", 5000)
    }

    set playerModel(patient: Player) {
        this.restoreService.setItem(patient);
    }

    get playerModel(): Player {
        return this.restoreService.getItem();
    }

    resetPlayer() {
        this.playerModel = this.restoreService.restoreItem();
    }

    onSubmit() {
        if (this.editMode) {
            let player = this.restoreService.getItemFinal();
            this.playerService.playerPutPlayer(player).subscribe({
                next: res => {
                    let i = this.players.findIndex(p => p.PlayerId == player.PlayerId);
                    this.players[i] = player;
                    this.restoreService.reset();
                    this.displaySuccess("Spieler " + player.Firstname + " erfolgreich geändert");
                },
                error: res => {
                    if (res.status == 400) {
                        this.displayError("Fehlerhafter Spieler");
                    }
                    else if (res.status == 403) {
                        this.displayError("Nicht eingeloggt");
                        setTimeout(() => this.userService.logout(), 2000)
                    }
                    else if (res.status == 500) {
                        this.displayError("Oops. Da ging was schief");
                    }
                    else {
                        this.displayError("Verbindungsproblem");
                    }
                }
            });
        } else {
            let player = this.restoreService.getItemFinal();
            this.playerService.playerPostPlayer(player).subscribe({
                next: res => {
                    this.getPlayers();
                    this.restoreService.reset();
                    this.displaySuccess("Spieler " + player.Firstname + " erfolgreich angelegt.")
                },
                error: res => {
                    if (res.status == 400) {
                        this.displayError("Fehlerhafter Spieler");
                    }
                    else if (res.status == 403) {
                        this.displayError("Nicht eingeloggt");
                        setTimeout(() => this.userService.logout(), 2000)
                    }
                    else if (res.status == 409) {
                        this.displayError("Username existiert bereits");
                    }
                    else if (res.status == 500) {
                        this.displayError("Oops. Da ging was schief");
                    }
                    else {
                        this.displayError("Verbindungsproblem");
                    }
                }
            });
        }
    }

    private fileChange(event) {
        let file = event.srcElement.files[0];
        let filesize: number = ((file.size/1024)/1024);
        console.log(filesize);
        if (filesize > 1.5) {
            this.displayError("Bild zu groß (1.5MB max!)");
            return;
        }

        let reader = new FileReader();
        reader.onloadend = (e) => {
            this.playerModel.Picture = reader.result.substring(23);
            this.playerModel.SafePicture = this.sanitizer
                .bypassSecurityTrustResourceUrl('data:image/jpeg;charset=utf-8;base64,' +
                    this.playerModel.Picture);
        };
        reader.readAsDataURL(file);
    }

    private newPlayer() {
        let newPlayer: Player = {
            Firstname: "", Lastname: "", Nickname: "", Username: "", PasswordString: "", IsAdmin: false,
            PlaysMondays: false, PlaysTuesdays: false, PlaysWednesdays: false, PlaysThursdays: false,
            PlaysFridays: false, PlaysSaturdays: false, PlaysSundays: false
        };
        this.editMode = false;
        this.playerModel = newPlayer;
    }

    private cancel() {
        this.restoreService.reset();
        this.editMode = true;
    }

    private selectPlayer(player) {
        this.playerModel = player;
        this.playerModel.SafePicture = this.sanitizer
            .bypassSecurityTrustResourceUrl('data:image/jpeg;charset=utf-8;base64,' +
                this.playerModel.Picture);
        this.editMode = true;
    }

    getPlayers() {
        this.loading = true;
        this.playerService.playerGetAll()
            .subscribe(
                p => {
                    this.players = p;
                },
                error => {
                    this.errorMessage = "Verbindungsproblem";
                    this.successMessage = "";
                    this.loading = false;
                },
                () => {
                    this.errorMessage = "";
                    this.successMessage = "";
                    this.loading = false;
                }
            );
    }

    ngOnInit() {
        this.getPlayers();
        this.restoreService.reset();
    }

    ngOnDestroy() {
        this.restoreService.reset();
    }
}
