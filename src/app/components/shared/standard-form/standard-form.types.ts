import { Subscription } from "rxjs";
import { LoginCredentials, User } from "../../user/user.types";

export type StandardFormHandler = (credentials: LoginCredentials) => Subscription;