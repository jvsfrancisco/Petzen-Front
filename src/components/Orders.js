import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import Order from "./Order";
import UserContext from "./../contexts/UserContext";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const TOKEN = localStorage.getItem("TOKEN");
    const { Error } = useContext(UserContext);

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${TOKEN}` },
        };
        const promise = axios.get(`https://projeto14-petzen-back.herokuapp.com/sales`, config);
        promise.then((res) => {
            setOrders(res.data.reverse());
            console.log(res.data);
        });
        promise.catch((err) => {
            Error(err);
        });
    }, []);

    return (
        <Main>
            <h2>Meus pedidos</h2>
            {orders.length > 0 ? (
                orders.map((order) => <Order order={order} />)
            ) : (
                <p>Você não tem nenhum pedido!</p>
            )}
        </Main>
    );
}

const Main = styled.main`
    margin-top: 60px;
    padding: 18px;
    background-color: var(--orange);

    h2 {
        font-weight: 700;
        font-size: 25px;
        margin-bottom: 15px;
    }
`;
