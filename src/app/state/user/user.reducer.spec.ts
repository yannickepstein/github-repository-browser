import { UserState, userReducer } from "./user.redcuer";
import { GithubUser } from 'src/app/model/githubUser';
import * as UserActions from './user.actions';

describe('Test User Reducer', () => {
  let initialState: UserState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {}
    };
  });

  it('Load users finished should update the state with all loaded users', () => {
    const users: GithubUser[] = [
      new GithubUser('id1', 'user1', 'avatarUrl1', 'url1'),
      new GithubUser('id2', 'user2', 'avatarUrl2', 'url2')
    ];

    const state = userReducer(initialState, UserActions.loadUsersFinished({ users: users }));

    expect(state.ids).toEqual(users.map(user => user.id));
    expect(state.entities).toEqual({
      id1: users[0],
      id2: users[1]
    });
  });
});