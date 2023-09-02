import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import avatar from "../../assets/img/user.png"
import Global from '../../helpers/Global';
import { SerializeForm } from '../../helpers/SerializeForm';

const Config = () => {

    const { auth, setAuth } = useAuth();

    const token = localStorage.getItem("token")

    const [saved, setSaved] = useState("not_saved");

    const updateUser = async (e) => {
        e.preventDefault();

        let newDataUser = SerializeForm(e.target);
        delete newDataUser.file0;

        const request = await fetch(`${Global.url}user/update`, {
            method: "PUT",
            body: JSON.stringify(newDataUser),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const data = await request.json();
        console.log(data);

        if(data.status == "success" && data.user) {
            setAuth(data.user)
            setSaved("saved")
        } else {
            setSaved("error")
        }

        //Subir imagen
        const fileInput = document.querySelector("#file")

        if(data.status == "success" && fileInput.files[0]) {

            //Recoger fichero a subir
            const formData = new FormData();
            formData.append("file0", fileInput.files[0]);

            //Peticion para enviar fichero
            const uploadRequest = await fetch(`${Global.url}user/uplad`, {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })

            const uploadData = await uploadRequest.json();

            if(uploadData.status == "success" && uploadData.user){
                setAuth(uploadData.user)
                setSaved("saved")
            } else {
                setSaved("error")
            }

        }
    }

    return (
        <>
            <header className="content__header content__header--public">
                <h1 className="content__title">Ajustes</h1>
            </header>

            <div className="content__posts">

                {saved == "saved" ? <strong className='alert alert-success'>"Usuario actualizado"</strong> : ""}
                {saved == "error" ? <strong className='alert  alert-danger'>"El usuario no se ha actualizado"</strong> : ""}

                <form className='config-form' onSubmit={updateUser}>
                    <div className='form-group'>
                        <label htmlFor='name'>Nombre</label>
                        <input type='text' name='name' defaultValue={auth.name} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='surname'>Apellidos</label>
                        <input type='text' name='surname' defaultValue={auth.surname} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='nick'>Nick</label>
                        <input type='text' name='nick' defaultValue={auth.nick} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='bio'>Bio</label>
                        <textarea name='bio' defaultValue={auth.bio} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='email'>Correo electrónico</label>
                        <input type='email' name='email' defaultValue={auth.email} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>Contraseña</label>
                        <input type='password' name='password' />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='file0'>Avatar</label>
                        <br/>
                        <div className="general-info__container-avatar">
                            {auth.image != "default.png" && <img src={`${Global.url}user/avatar/${auth.image}`} className="container-avatar__img" alt="Foto de perfil" />}
                            {auth.image == "default.png" && <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />}
                        </div>
                        <br/>
                        <input type='file' name='file0' id="file0" />
                    </div>
                    <br/>
                    <input type='submit' value="Actualizar" className='btn btn-success' />
                </form>

            </div>
        </>
    )
}

export default Config