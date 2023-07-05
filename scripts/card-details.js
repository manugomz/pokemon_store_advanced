const route = (event) =>{
    event= event||window.event;
    event.preventDefault();
    window.history.pushState({},'', event.target.href)
}

const handleLocation = async() =>{
    const path = window.localStorage.pathname;
}

window.route = route;