import { UserStore } from "./UserStore";
import { MealStore } from "./MealStore";
import { RouterStoreWrapper } from "../Routing/RouterStoreWrapper";
import { UiStore } from "./UiStore";
import { configure } from "mobx";
import { TagStore } from "./TagStore";

configure({
    enforceActions: "always",
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
});

export default class RootStore {
    routerStore: RouterStoreWrapper;
    uiStore: UiStore;
    userStore: UserStore;
    mealStore: MealStore;
    tagStore: TagStore;

    constructor() {
        this.routerStore = new RouterStoreWrapper(this);
        this.uiStore = new UiStore(this);
        this.userStore = new UserStore(this);
        this.mealStore = new MealStore(this);
        this.tagStore = new TagStore(this);
    }
}
