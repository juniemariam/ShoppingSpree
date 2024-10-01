import React from 'react'

import FeedSpecProd from '../../components/feedProdList/FeedSpecProd/FeedSpecProd'

const FeedM = (props) => {
    return(
        <FeedSpecProd
            srchItem = {props.srchItem}
            />
    )
}

export default FeedM