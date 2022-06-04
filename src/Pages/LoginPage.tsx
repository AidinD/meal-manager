import { Button, Form, Input, PageHeader, Row } from 'antd';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useStore } from '../Stores/StoreProvider';
import { Meal } from '../Types/Meal';
import { UserOutlined } from '@ant-design/icons';

interface IAppProps {
}

const LoginPage = (props: IAppProps) => {
    const { userStore } = useStore();
    const { mealStore } = useStore();

    const mealList = () => {
        return mealStore?.allMeals.map((meal: Meal) => {
            return <div key={meal.id}>{meal.name}</div>
        });
    }

    const addMeal = () => {
        mealStore?.addMeal({
            id: mealStore?.allMeals.length + 1,
            name: 'New Meal',
            description: 'New Description',
            tags: [],
            recipe: {
                id: 1,
                ingredients: [],
                description: ''
            },
            lastMade: new Date(),
            image: '',
        });
    }

    const login = () => {
        userStore?.onTryLogin();
    }

    const onUserInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        userStore.setUserInput(event.target.value);
    }

    const onFinish = (value: string) => {
        console.log("value", value);
    }

    return (
        <div className='container'>
            <Row className='title-row'>
                <PageHeader
                    className="site-page-header"
                    backIcon={false}
                    title="Login page"
                />
            </Row>
            <Form
                name='login'
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        size="large"
                        placeholder="Username"
                        allowClear={true}
                        onChange={onUserInputChange}
                        prefix={<UserOutlined />}
                    />
                </Form.Item>
            </Form>

            <Button type='primary' onClick={addMeal}> Add Meal </Button>
            <Button type='primary' onClick={login}> Login </Button>
            {mealList()}
        </div>
    )
};

export default observer(LoginPage);