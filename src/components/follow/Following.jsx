import React, { useEffect, useState } from 'react'
import Global from '../../helpers/Global'
import UserList from '../user/UserList'
import { useParams } from 'react-router-dom';
import GetProfile from '../../helpers/GetProfile';

const Following = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [following, setFollowing] = useState([]);
    const [userPorfile, setUserPorfile] = useState({});

    const params = useParams();

    useEffect(() => {
        getUser(1);
        GetProfile(params.userId, setUserPorfile);
    }, [])

    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getUser(next);
    }

    const getUser = async (nextPage = 1) => {
        //Sacar userId del usaurio
        const userId = params.userId;

        const request = await fetch(`${Global.url}follow/following/${userId}/${nextPage}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json, charset=utf-8",
                "Authorization": localStorage.getItem("token")
            }
        })

        const data = await request.json();
        
        let following2 = data.follows

        if (data.follows && data.status == "success") {

            let newUsers = data.follows;

            if (users.length >= 1) {
                newUsers = [...users, ...data.follows];
            }

            
            setUsers(newUsers);
            setFollowing(data.user_following);

            if (users.length >= data.follows.length) {
                setMore(false)
            }
        }

    }

    return (
        <section className="layout__content">

            <header className="content__header">
                <h1 className="content__title">Usuarios que sigue: {userPorfile.name} {userPorfile.surname}</h1>
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

export default Following