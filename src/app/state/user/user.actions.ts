import { createAction, props } from "@ngrx/store";
import { GithubUser } from '../../model/githubUser';

export enum UserActionTypes {
  LoadUsersFinished = '[User] Load Users Finished'
}

export const loadUsersFinished = createAction(
  UserActionTypes.LoadUsersFinished,
  props<{ users: GithubUser[] }>()
);