import { createAction, props } from "@ngrx/store";
import { IProfile } from "../../models/profile.model";

export const get = createAction("[Profile] Get");
export const getSuccess = createAction("[Profile] Get success", props<{ profile: IProfile }>());
export const getFailure = createAction("[Profile] Failure", props<{ error: string }>());