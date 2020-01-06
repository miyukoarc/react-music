class Request {

    constructor (){
        this._baseUrl = "http://localhost:4000"//假装这是私有变量
    }

    get(url) {
        return new Promise((resolve, reject) => {
            fetch(this._baseUrl + url,
                {
                    credentials: 'include',
                    headers: {
                        referer:'https://music.163.com',
                        host: 'music.163.com'
                    }
                })
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    }

    post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url + this._baseUrl,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data),
                    credentials: 'include'
                })
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    }
}

export default new Request();
