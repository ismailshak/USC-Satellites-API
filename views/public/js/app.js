const title = document.querySelector(".home-button");
const form = document.querySelector(".search-form")
const satellitesRedirect = document.querySelector(".satellites-redirect")

// title.addEventListener('click', e => {
//     e.preventDefault()
//     window.location.assign("/")

// })

form.addEventListener('submit', e => {
    e.preventDefault()
    const model = e.srcElement[0].value
    const field = e.srcElement[1].value
    const value = e.srcElement[2].value
    window.location.assign(`/api/${model}/${field}/${value}`)
})