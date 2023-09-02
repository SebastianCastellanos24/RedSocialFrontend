import React, {useEffect, useState} from 'react'
import PublicationList from '../publication/PublicationList'
import useAuth from '../../hooks/useAuth'
import Global from '../../helpers/Global'

const Feed = () => {

    const { auth } = useAuth()
    const [publications, setPublications] = useState([]);
    const [page, setPage] = useState(1)
    const [more, setMore] = useState(true);

    useEffect(() => {
        getPublication(1, true);
    }, [])

    const getPublication = async (nextPage = 1) => {
        const request = await fetch(`${Global.url}publication/feed/${nextPage}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": localStorage.getItem("token")
            }
        })

        const data = await request.json();
        console.log(data)

        //Cuando este todo correcto
        if (data.status == "success") {
            let newPublications = data.publication;
            console.log(newPublications.length)

            if (newPublications.length >= 1) {
                newPublications = [...publications, ...data.publication]
            }

            setPublications(newPublications);

            if (publications.length >= data.totalPages) {
                setMore(false);
            }

            if(data.totalPages <= 1) {
                setMore(false);
            }
        }
    }

    return (
        <section className="layout__content">

            <header className="content__header">
                <h1 className="content__title">Timeline</h1>
                <button className="content__button">Mostrar nuevas</button>
            </header>

            <PublicationList 
                publications = {publications}
                page = {page}
                setPage = {setPage}
                more = {more}
                setMore = {setMore}
                getPublication = {getPublication}
                auth = {auth}
            />

            <br />

        </section>

    )
}

export default Feed