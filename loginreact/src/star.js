import ReactStars from 'react-stars'
import React from 'react'

const ratingChanged = (newRating) => {
    console.log(newRating)
};

export class Star extends React.Component{

    render() {
        return (
            <div>
                <ReactStars
                    count={1}
                    onChange={ratingChanged}
                    size={25}
                    color2={'#ffd700'}
                    half={false}
                />
            </div>
        );
    }
}
