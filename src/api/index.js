class Request {

    constructor (){
        this._baseUrl = "http://localhost:4000"//假装这是私有变量
    }

    get(url) {
        return new Promise((resolve, reject) => {
            fetch(this._baseUrl + url)
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
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    }
}

export default new Request();
