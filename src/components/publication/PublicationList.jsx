import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Global from '../../helpers/Global'

const PublicationList = ({publications, page, setPage, more, setMore, getPublication, auth}) => {

    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getPublication(next);
    }

    const deletePubication = async (publicationId) => {
        const request = await fetch(`${Global.url}publication/remove/${publicationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": localStorage.getItem("token")
            }
        })

        const data = await request.json();

        setPage(1);
        setMore(true);
        getPublication(1, true);
    }

    return (
        <>
            <div className="content__posts">

                {publications.map(publication => {
                    return (
                        <article className="posts__post" key={publication._id}>

                            <div className="post__container">

                                <div className="post__image-user">
                                    <Link to={`/social/perfil/${publication.user._id}`} className="post__image-link">
                                        {publication.user.image != "default.png" && <img src={`${Global.url}user/avatar/${publication.user.image}`} className="post__user-imgage" alt="Foto de perfil" />}
                                        {publication.user.image == "default.png" && <img src={avatar} className="post__user-imgage" alt="Foto de perfil" />}
                                    </Link>
                                </div>

                                <div className="post__body">

                                    <div className="post__user-info">
                                        <a href="#" className="user-info__name">{publication.user.name} {publication.user.surname}</a>
                                        <span className="user-info__divider"> | </span>
                                        <a href="#" className="user-info__create-date">{publication.user.created_at}</a>
                                    </div>

                                    <h4 className="post__content">{publication.text}</h4>

                                </div>

                            </div>

                            {auth._id == publication.user._id &&
                                <div className="post__buttons">

                                    <button onClick={() => deletePubication(publication._id)} className="post__button">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>

                                </div>
                            }

                        </article>
                    )
                })}
            </div>
            
            {more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas publicaciones
                    </button>
                </div>
            }
        </>
    )
}

export default PublicationList