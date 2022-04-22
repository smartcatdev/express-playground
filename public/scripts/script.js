/**
 * Get all tweets
 */
getAllTweets()
function getAllTweets() {
    fetch('http://localhost:8001/api/tweets')
    .then(response => response.json())
    .then(data => {
        let html = ''
        
        for (const tweet of data.data) {
            html += `<div>${tweet.text}</div>`
        }
        $('.tweets').html('')
        $('.tweets').append(html)
    })
}


/**
 * Submit a new tweet
 */
const form = document.querySelector('.submit-tweet')
console.log(form)

form.addEventListener('submit', (event) => {

    // stop form from reloading page
    event.preventDefault()
    
    $.ajax({
        type: "post",
        url: 'http://localhost:8001/api/tweets',
        data: JSON.stringify({
            text: $('#text').val()
        }),
        contentType: 'application/json',
        success: function (data) {
            console.log(data)
        }
    })

    .then(data => {
        console.log('success:', data)
        getAllTweets()
    })
    
})

