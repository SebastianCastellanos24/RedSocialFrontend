import Global from "./Global";

const GetProfile = async (userId, setState) => {
    const request = await fetch(`${Global.url}user/profile/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json, charset=utf-8",
            "Authorization": localStorage.getItem("token")
        }
    })

    const data = await request.json();

    if(data.status == "success"){
        setState(data.user);
    }

    return data;
}

export default GetProfile