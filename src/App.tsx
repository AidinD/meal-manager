import "./App.scss";
import { RouterView } from "mobx-state-router";
import { Key, ReactNode, useEffect } from "react";
import { viewMap } from "./Routing/ViewMap";
import { useStore } from "./Stores/StoreProvider";
import { Layout, Menu, MenuProps, PageHeader } from "antd";
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUtensils,
    faListCheck,
    faCalendarDay,
    faBurger,
    faCarrot,
    faTags,
    faLayerGroup,
    faHashtag,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Header } from "antd/lib/layout/layout";
import { RouteNames } from "./Types/Shared";

const App = () => {
    const { userStore, routerStore } = useStore();
    type MenuItem = Required<MenuProps>["items"][number];

    const { Sider } = Layout;

    useEffect(() => {
        if (!userStore.isLoggedIn) {
            routerStore.goToLogin();
        }
    }, [userStore, routerStore]);

    const getItem = (
        label: ReactNode,
        key: Key,
        type?: "item" | "group" | "divider",
        icon?: ReactNode,
        onClick?: () => void,
        children?: MenuItem[]
    ) => {
        return { key, icon, onClick, children, label, type } as MenuItem;
    };

    const items: MenuItem[] = [
        getItem("", "1", "group"),
        getItem(
            "Overview",
            "overview",
            "item",
            <FontAwesomeIcon icon={faUtensils} />,
            () => routerStore.goToHomePage()
        ),
        getItem("Planning", "planning", "divider"),
        getItem(
            "Planner",
            "planner",
            "item",
            <FontAwesomeIcon icon={faCalendarDay} />,
            () => routerStore.goToPlannerPage()
        ),
        getItem(
            "Shopping List",
            "shoppingList",
            "item",
            <FontAwesomeIcon icon={faListCheck} />
        ),
        getItem(
            "Layout",
            "layout",
            "item",
            <FontAwesomeIcon icon={faLayerGroup} />
        ),
        getItem("Manager", "manager", "divider"),
        getItem(
            "Meals",
            "meals",
            "item",
            <FontAwesomeIcon icon={faBurger} />,
            () => {
                routerStore.goToMealsPage();
            }
        ),
        getItem(
            "Ingredients",
            "ingredients",
            "item",
            <FontAwesomeIcon icon={faCarrot} />
        ),
        getItem(
            "Tags",
            "tags",
            "item",
            <FontAwesomeIcon icon={faTags} />,
            () => {
                routerStore.goToTagsPage();
            }
        ),
        getItem(
            "Categories",
            "categories",
            "item",
            <FontAwesomeIcon icon={faHashtag} />
        ),
        getItem("Settings", "settings", "divider"),
        getItem(
            "Sign out",
            "signout",
            "item",
            <FontAwesomeIcon icon={faRightFromBracket} />,
            () => {
                userStore.logout();
            }
        ),
    ];

    return (
        <Layout className="App">
            {routerStore.currentRoute?.name !== "login" ? (
                <>
                    <Sider collapsible>
                        <Menu
                            className="menu"
                            mode="inline"
                            theme="dark"
                            items={items}
                            defaultSelectedKeys={[
                                routerStore.currentRoute!.name,
                            ]}
                            onSelect={(info) =>
                                routerStore.setPageName(
                                    routerStore.currentRoute?.name as RouteNames
                                )
                            }
                        ></Menu>
                    </Sider>
                    <Layout id="appLayout">
                        <Header id="appHeader">
                            <PageHeader
                                className="appPageHader"
                                backIcon={false}
                                title={
                                    routerStore.pageName
                                        .charAt(0)
                                        .toUpperCase() +
                                    routerStore.pageName.slice(1)
                                }
                            />
                        </Header>
                        <RouterView viewMap={viewMap} />
                    </Layout>
                </>
            ) : (
                <RouterView viewMap={viewMap} />
            )}
        </Layout>
    );
};

export default observer(App);
