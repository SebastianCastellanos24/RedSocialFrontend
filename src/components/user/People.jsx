import React, { useEffect, useState } from 'react'
import Global from '../../helpers/Global'
import UserList from './UserList'

const People = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        getUser(1);
        console.log(page)
    }, [])

    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getUser(next);
    }

    const getUser = async (nextPage = 1) => {

        const request = await fetch(`${Global.url}user/list/${nextPage}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json, charset=utf-8",
                "Authorization": localStorage.getItem("token")
            }
        })

        const data = await request.json();

        if (data.users.docs && data.status == "success") {

            let newUsers = data.users.docs;

            if (users.length >= 1) {
                newUsers = [...users, ...data.users.docs];
            }

            setUsers(newUsers);
            setFollowing(data.following);

            if (users.length >= data.users.totalPages) {
                setMore(false)
            }
        }

    }

    return (
        <section className="layout__content">

            <header className="content__header">
                <h1 className="content__title">Gente</h1>
                <button className="content__button">Mostrar nuevas</button>
            </header>

            <UserList users={users} getUser={getUser}
                following={following} setFollowing={setFollowing}
            />

            {more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas personas
                    </button>
                </div>
            }

        </section>
    )
}

export default People