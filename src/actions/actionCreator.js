import { userDataRef, authRef, provider } from '../firebase';

export const signIn = () => dispatch => {
    authRef
      .signInWithPopup(provider)
      .then(result => {})
      .catch(error => {
        console.log(error);
      });
  };
  
export const signOut = () => dispatch => {
    authRef
        .signOut()
        .then(() => {
        console.log("done")
        // Sign-out successful.
        })
        .catch(error => {
        console.log(error);
        });
};

export const createCharacter = (data, uid) => dispatch => {
    console.log('Saving');
    userDataRef
        .child(uid)
        .push()
        .set(data);
};

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: "FETCH_USER",
        payload: user
      });
    } else {
      dispatch({
        type: "FETCH_USER",
        payload: null
      });
    }
  });
};

export const fetchCharacter = uid => async dispatch => {
  userDataRef.child(uid).on("value", snapshot => {
    dispatch({
      type: "FETCH_CHARACTER",
      payload: snapshot.val()
    });
  });
};
