import { makeAutoObservable, runInAction, reaction, observable, computed, action } from "mobx"
import { User } from "../Types/User";
import RootStore from "./Index";

export class UserStore {
    rootStore: RootStore;

    currentUser: User | undefined = undefined;
    userInput: string = "";

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        this.getUserFromLocalStorage();

        makeAutoObservable(this, {
            // Observables
            userInput: observable,
            // Computed

            // Actions
            setCurrentUser: action,
            saveCurrentUserToLocalStorage: action,
            setUserInput: action,
        });
    }

    setUserInput(userInput: string) {
        this.userInput = userInput;
    }

    onTryLogin() {
        console.log("onTryLogin");
        // See if userInput exists as user in database
        let user: User = this.fetchUserIfExists(this.userInput)
        if (user.id < 0 ) {
            // User does not exist
            alert("User does not exist");
        }
        else {
            this.onLogin(user);
        }

        // Change page
    }

    fetchUserIfExists(userInput: string) : User {
        // Mocked, for now. Replace with API call
        let user: User = {
            id: 1,
            name: userInput,
            share: []
        }

        if (userInput != "Daniel") {
            user = {
                id: -1,
                name: "empty",
                share: []
            }
        }
        return user;
    }

    onLogin(user: User) {
        this.setCurrentUser(user);
        this.saveCurrentUserToLocalStorage();
    }

    setCurrentUser(user: User | undefined) {
        this.currentUser = user;
    }

    saveCurrentUserToLocalStorage() {
        if (this.currentUser) {
            localStorage.setItem("user", JSON.stringify(this.currentUser));
        }
    }

    getUserFromLocalStorage = () => {
        const user = localStorage.getItem("user");
        if (user) {
            this.setCurrentUser(JSON.parse(user));
        } else {
            this.setCurrentUser(undefined);
        }
    }
}