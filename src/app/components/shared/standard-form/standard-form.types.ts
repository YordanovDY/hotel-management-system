import { Subscription } from "rxjs";
import { LoginCredentials } from "../../user/user.types";

export type StandardFormHandler = (credentials: LoginCredentials) => Subscription;