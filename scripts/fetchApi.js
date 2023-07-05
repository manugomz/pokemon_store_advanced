const fetchApi = async(url) => {
    try {
        $loader.innerHTML= `<span class="loader"></span>`;
        let res =await fetch(url);
        let json = await res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        $loader.innerHTML=``;
        return json;
    } catch (error) {
        const errorMsg = document.createElement('p');
        errorMsg.textContent = `error: ${error.message}`;
        $parentElement.appendChild(errorMsg);
    }  
}

