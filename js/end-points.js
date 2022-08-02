class EndPointscontroller {
    serverEndPoints = [{
        name: 'argocd',
        url: '',
        token: '29OLfrflhD4CiUW7HTC7LkrHd1q_6Eojoxvjoy8qYxmKtqjj1'
    }];

    testMakerEndPoints = [{
        name: 'administrator',
        url: '',
        token: '2AcXUbueVLNj8xem2wnx61ffi2J_2rty9g7EcFXYrYPr228gv'
    },{
        name: 'test player',
        url: '',
        token: '2AFtm5YtcY4aDrNdjpxRtApjuES_5hDCtABTVS7kYXPVkGXiZ'
    }];

    constructor() {
        this.serverEndPoints.forEach(endPoint => {
            this.getEndPoint(endPoint).then(endPoint => {
                $('.js__server-end-points').append(`
                <tr>
                    <td><a target="_blank" href="${endPoint.url}">${endPoint.name}</a></td>
                </tr>`)
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
        })
    }
}

new EndPointscontroller();