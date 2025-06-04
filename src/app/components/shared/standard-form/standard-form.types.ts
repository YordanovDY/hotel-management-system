import { Subscription } from "rxjs";
import { LoginCredentials, RegisterCredentials } from "../../user/user.types";
import { RoomInput } from "../../room/room.types";

export type StandardFormHandler =
    ((credentials: LoginCredentials) => Subscription) |
    ((credentials: RegisterCredentials) => Subscription | void) |
    ((input: RoomInput) => Subscription | void);