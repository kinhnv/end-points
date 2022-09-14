class EndPointscontroller {
    serverEndPoints = [{
        name: 'argocd',
        type: 1,
        url: '',
        token: '29OLfrflhD4CiUW7HTC7LkrHd1q_6Eojoxvjoy8qYxmKtqjj1'
    },{
        name: 'ssh',
        type: 2,
        url: '',
        token: '2A3pcj15xBCidNr1U7fNHEvsVt4_rphzWD9zR8DL5LrMViyZ'
    },{
        name: 'mssql',
        type: 3,
        url: '',
        token: '29kkiBzD1TkeuQULDmwlJ66R5Hz_4GJNQp5yYHjmy6wV5Yw1t'
    },{
        name: 'mongodb',
        type: 4,
        url: '',
        token: '2EkvymZNZuNRaeh1cMPZsXHiMwt_4qmzS6HQccsg6ZFM9uRhp'
    }];

    testMakerEndPoints = [{
        name: 'administrator',
        type: 1,
        url: 'https://tm-bro.github.io/admin',
    },{
        name: 'test player',
        type: 1,
        url: 'https://tm-bro.github.io/test-player',
    }];

    constructor() {
        this.serverEndPoints.forEach(endPoint => {
            this.getEndPoint(endPoint).then(endPoint => {
                if (endPoint.type == 1) {
                    $('.js__server-end-points').append(`
                    <tr>
                        <td><a target="_blank" href="${endPoint.url}">${endPoint.name}</a></td>
                    </tr>`)
                }
                else if (endPoint.type == 2) {
                    $('.js__server-end-points').append(`
                    <tr>
                        <td><p>${endPoint.name}: ssh kinhn@${endPoint.url.substring(6, 23)} -p ${endPoint.url.substring(24)}</p></td>
                    </tr>`)
                }
                else if (endPoint.type == 3) {
                    $('.js__server-end-points').append(`
                    <tr>
                        <td><p>${endPoint.name}: ${endPoint.url.substring(6, 23)},${endPoint.url.substring(24)}</p></td>
                    </tr>`)
                }
                else if (endPoint.type == 4) {
                    $('.js__server-end-points').append(`
                    <tr>
                        <td><p>${endPoint.name}: mongodb://${endPoint.url.substring(6, 23)}:${endPoint.url.substring(24)}</p></td>
                    </tr>`)
                }
            });
        });
        this.testMakerEndPoints.forEach(endPoint => {
            this.getEndPoint(endPoint).then(endPoint => {
                $('.js__test-maker-end-points').append(`
                <tr>
                    <td><a target="_blank" href="${endPoint.url}">${endPoint.name}</a></td>
                </tr>`)
            });
        });
    }

    getEndPoint(endPoint) {
        return new Promise((resolve, reject) => {
            if (endPoint.url) {
                resolve(endPoint);
            }
            else {
                $.ajax({
                    url: 'https://api.ngrok.com/tunnels',
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", `Bearer ${endPoint.token}`);
                        request.setRequestHeader("Ngrok-Version", 2);
                    },
                }).then((data) => {
                    if (data.tunnels && data.tunnels.length) {
                        endPoint.url = data.tunnels[0].public_url;
                    }
                    resolve(endPoint);
                });
            }
        })
    }
}

new EndPointscontroller();
