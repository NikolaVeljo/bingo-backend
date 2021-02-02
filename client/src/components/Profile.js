import React, { Fragment, useState,useEffect } from 'react';
import API from "../API";

export default function Profile () {

    const [redis, setRedis] = useState(null);

    const getRedis = async () => {
        const response = await API.get("/profile");

        setRedis(response.data)
    };

    useEffect(() => {
        getRedis();
        console.log(redis)
    },[] );



    return (
        <Fragment>
            <div>
                {redis && JSON.stringify(redis)}
            </div>
        </Fragment>
    )
}