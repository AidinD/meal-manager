import { Col, Divider, Empty, Image, Rate, Row, Tag as TagAnt } from "antd";
import Title from "antd/lib/typography/Title";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../Stores/StoreProvider";
import { Meal, Tag } from "../Types/Meal";
import "./ViewMeal.scss";

interface IViewMealProps {
    meal: Meal;
}

const ViewMeal = (props: IViewMealProps) => {
    return (
        <Row className="viewContainer">
            <Col span={12}>
                {props.meal.image ? (
                    <Image src={props.meal.image} />
                ) : (
                    <Empty description={"No image available"} />
                )}
            </Col>
            <Col className="contentColumn" offset={1} span={11}>
                <Title id="title" level={2}>
                    {props.meal.name}
                </Title>
                <div id="description">{props.meal.description}</div>
                <div className="viewFooter">
                    <div id="link">
                        {props.meal.recipe.length > 0 ? (
                            <a href={props.meal.recipe}>{props.meal.recipe}</a>
                        ) : null}
                    </div>
                    <div id="tagList">
                        {props.meal.tags.map((tag: Tag) => (
                            <TagAnt key={tag.id} color={tag.color}>
                                {tag.name}
                            </TagAnt>
                        ))}
                    </div>
                    <Divider className="divider"></Divider>
                    <div id="rate">
                        <Rate disabled allowHalf value={props.meal.rating} />
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default observer(ViewMeal);
