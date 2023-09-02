export const SerializeForm = (form) => {
    
    const formData = new FormData(form);

    const competeObj = {};

    for(let  [name, value] of formData) {
        competeObj[name] = value;
    }

    return competeObj;

}