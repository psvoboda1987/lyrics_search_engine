window.onload = () => {
    
    let search = document.getElementById('search');
    let input = document.getElementById('input');

    search.addEventListener('click', (event) => {

        event.preventDefault();

        getSearchResults();

    });

    input.addEventListener('keydown', (event) => {

        if (event.keyCode === 13) {

            getSearchResults();

        }

    });

}

function getSearchResults() {

    let input = document.getElementById('input');

    let query = input.value;
    query = query.replace(/ /g, '');
    query = encodeURI(query);

    let apiUrl = `https://genius.p.rapidapi.com/search?q=${query}`;

    getAjax(

        `php/proxy.php?url=${apiUrl}`,

        (reply) => {

            parseReply(reply);

        }

    );
    
}

function parseReply(reply) {

    let object = JSON.parse(reply);

    let hits = object.response.hits;

    let html = '';

    hits.forEach((hit) => {

        html += `
            <div class="song">
                <p>
                    <a href="${hit.result.url}" class="h4">
                        ${hit.result.title}
                    </a>
                </p>
                <p>
                    <a href="${hit.result.primary_artist.url}" class="h6">
                        ${hit.result.primary_artist.name}
                    </a>
                </p>
                <p>
                    <a href="${hit.result.url}" class="h4">
                        <img src="${hit.result.header_image_thumbnail_url}" alt="${hit.result.title}">
                    </a>
                </p>
            </div>
        `;

    });

    document.getElementById('result').innerHTML = `<div class="grid">${html}</div>`;

}

function getAjax(url, success = null, fail = null) {

    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.open('GET', url);

    xhr.onreadystatechange = function () {

        if (xhr.readyState > 3 && xhr.status == 200 && typeof success == 'function') {

            success(xhr.responseText);

        }
        else {

            if (typeof fail == 'function') fail();

        }

    };

    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.send();

    return xhr;

}