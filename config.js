module.exports = {
    search: {
        pageSize: 20,
        msBefore: 1000*60*60*24*7,
    },
    news: {
        countPerShow: 3
    },
    api: {
        news: {
            url: 'https://newsapi.org/v2',
            token: '94ad67b6000f42d886d0825e6b9cd7c0'
        },
        github: {
            url: 'https://api.github.com',
            user: 'smirnoff170888',
            repo: 'diplom'
        }
    }
}