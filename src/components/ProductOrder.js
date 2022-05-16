import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import UserContext from "./../contexts/UserContext";

export default function ProductOrder({ product, showDetails }) {
    const [productInfo, setProductInfo] = useState([]);
    const { Error } = useContext(UserContext);

    useEffect(() => {
        const promise = axios.get(
            `https://projeto14-petzen-back.herokuapp.com/products/${product.idProduct}`
        );
        promise.then((res) => {
            setProductInfo(res.data);
            console.log(res.data);
        });
        promise.catch((err) => {
            Error(err);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <Details>
            {showDetails ? (
                <>
                    <img src={productInfo.image} alt={productInfo.name} />
            <div>
                <p>{productInfo.name}</p>
                <p>
                    {product.quantity} unidade{product.quantity > 1 ? "s" : ""}
                </p>
            </div>
                </>
            ):(
                <p>{productInfo.name}</p>
            )}
            
        </Details>
    );
}

const Details = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 15px 15px 0px;

    img {
        width: 60px;
        margin-right: 25px;
    }

    p {
        font-size: 16px;
        line-height: 28px;
    }

    & > p {
        line-height: 16px;
    }
`;