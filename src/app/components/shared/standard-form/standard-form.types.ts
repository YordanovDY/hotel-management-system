import { Subscription } from "rxjs";
import { LoginCredentials, RegisterCredentials } from "../../user/user.types";

export type StandardFormHandler =
    ((credentials: LoginCredentials) => Subscription) |
    ((credentials: RegisterCredentials) => Subscription | void);