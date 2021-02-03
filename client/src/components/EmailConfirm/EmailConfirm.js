import React, { Fragment } from 'react';
import { useParams } from 'react-router';

export default function EmailConfirm () {

    let {id} = useParams();

    console.log(id);

    return (
        <Fragment>
            <div  > This is email confirmation page </div>
        </Fragment>
    )
}