import React, { useState, useEffect } from 'react'
import { Button } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useAppConext } from '../hooks/useAppContext'
import { LikeGenerate } from '../services/likegenerate'


export const Modal = ({ closeModal, isVisible, item, likes, mylikes }) => {

    const [like, setLike] = useState(0)
    const [mylike, setMyLike] = useState(false)
    const { token } = useAppConext()

    const handleLike = async () => {
        setLike(mylike ? like - 1 : like + 1);
        await LikeGenerate(item.id, token)
        setMyLike(!mylike)
    }

    const handleCloese = () => {
        closeModal()
    }

    useEffect(() => {
        setLike(likes);
        setMyLike(mylikes)

    }, [likes]);


    return (
        <div style={{ display: isVisible ? 'block' : 'none' }} className="modal">
            <Button className='btn-modal' onClick={handleCloese}><CloseIcon /></Button>
            <div className="modal-container">
                <div className="title-container"> <h1>{item.title}</h1> </div>

                <div className="photo-overview-container">

                    <div className="photo-container-modal">
                        <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="photomovie" />
                    </div>

                    <div className="overview-container">
                        <h2>Overview: </h2>
                        <p>
                            {item.overview}
                        </p>
                    </div>
                </div>
                <div className="detailsLike-container">

                    <div className="details-container">
                        <div className="item-1">

                            <h2>Language: </h2>
                            <p>
                                {item.original_language}
                            </p>
                        </div>
                        <div className="item-2">
                            <h2>Date: </h2>
                            <p>
                                {item.release_date}
                            </p>
                        </div>
                        <div className="item-3">
                            <h2>Average: </h2>
                            <p>
                                {item.vote_average}
                            </p>
                        </div>
                        <div className="item-4">
                            <h2>Popularity: </h2>
                            <p>
                                {item.popularity}
                            </p>
                        </div>
                        <div className="item-5">
                            <h2>Video: </h2>

                            {item.video === true ? <div className="onvideo"></div> : <div className="offvideo"></div>}

                        </div>
                    </div>
                    <div className="item-6">
                        <div className="imglike-container" onClick={handleLike}>
                            {mylike ? <img id='like-img' src="images/like.png" alt="likephoto" /> : <img id='dislike-img' src="images/dislike.png" alt="dislikephoto" />}
                            <p>
                                {like}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
