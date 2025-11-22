addEventListener("DOMContentLoaded", () => {
    fetch("./data.json").then((res) => {
        return res.json()
    }).then((data) => {
        localStorage.setItem("jsonData", JSON.stringify(data))
    })
    function getItem() {
        let jsonData = JSON.parse(localStorage.getItem("jsonData"))
        return jsonData
    }

    let jsoncontent = document.querySelector(".extension-content")


    let actionsBtns = document.querySelector(".action-buttons")
    let themesSetting = document.querySelector(".themes-settings")
    let body = document.querySelector("body")
    let lighttheme = document.querySelector(".light-theme")
    let header = document.querySelector(".header")
    let darktheme = document.querySelector(".dark-theme")
    function renderList(data, index) {
        let extensionList = document.createElement("div")
        extensionList.className = "extensions-lists"
        let cardheader = document.createElement("div")
        cardheader.className = "extension-header"
        let cardImage = document.createElement("div")
        let listdetails = document.createElement("div")
        listdetails.className = "extention-listdetails"
        let extensionfooter = document.createElement("div")
        extensionfooter.className = "extension-footer"
        let extentionbtn = document.createElement("button")
        let label = document.createElement("label")
        label.className = "switch"
        let input = document.createElement("input")
        input.setAttribute("type", "checkbox")
        input.setAttribute("value", index)
        input.checked = data?.isActive

        let span = document.createElement("span")
        span.className = "slider round"

        extentionbtn.className = "extensionlistBtn"
        extentionbtn.textContent = "Remove"
        extentionbtn.setAttribute("value", data?.name)

        let image = document.createElement("img")
        image.src = data?.logo
        cardImage.append(image)

        let p1 = document.createElement("p")
        let p2 = document.createElement("p")
        p1.textContent = data?.name

        p2.textContent = data?.description
        label.appendChild(input)
        label.appendChild(span)

        listdetails.appendChild(p1)
        listdetails.appendChild(p2)
        extensionfooter.appendChild(extentionbtn)
        extensionfooter.appendChild(label)
        cardheader.appendChild(cardImage)
        cardheader.appendChild(listdetails)
        extensionList.appendChild(cardheader)
        extensionList.appendChild(extensionfooter)
        jsoncontent.appendChild(extensionList)
    }
    function renderData(data) {
        for (let i = 0; i < data.length; i++) {
            renderList(data[i], i)
        }

    }
    let jsonData = getItem()
    renderData(jsonData)
    actionsBtns.addEventListener("click", (e) => {
        let jsonData = getItem()
        console.log(jsonData);

        if (e.target.tagName === "BUTTON") {
            jsoncontent.innerHTML = ""
            if (e.target.textContent === "All") {
                e.target.style.backgroundColor = "hsl(3, 77%, 44%)"
                console.log(actionsBtns.children)
                Array.from(actionsBtns.children).forEach((item) => {
                    if (item !== e.target) {
                        console.log(item)
                        item.style.backgroundColor = "white"
                    }
                })
                renderData(jsonData)
            }
            if (e.target.textContent === "Active") {
                console.log(jsonData)
                e.target.style.backgroundColor = "hsl(3, 77%, 44%)"
                Array.from(actionsBtns.children).forEach((item) => {
                    if (item !== e.target) {
                        console.log(item)
                        item.style.backgroundColor = "white"
                    }
                })
                const filterActive = jsonData.filter((item) => item.isActive)
                console.log("active", filterActive)
                renderData(filterActive)
            }
            if (e.target.textContent === "Inactive") {
                e.target.style.backgroundColor = "hsl(3, 77%, 44%)"
                Array.from(actionsBtns.children).forEach((item) => {
                    if (item !== e.target) {
                        console.log(item)
                        item.style.backgroundColor = "white"
                    }
                })
                const filterInActive = jsonData.filter((item) => !item.isActive)
                console.log("active", filterInActive)
                renderData(filterInActive)
            }
        }
    })
    jsoncontent.addEventListener("click", (e) => {
        let jsonData = getItem()
        if (e.target.tagName === "INPUT") {
            console.log(e.target.value, jsonData)
            const findbyindex = jsonData.find((item, index) => index == e.target.value)
            console.log(findbyindex)
            findbyindex.isActive = !findbyindex.isActive
            jsonData.splice(e.target.value, 1, findbyindex)
            localStorage.setItem("jsonData", JSON.stringify(jsonData))
            console.log(jsonData)

        }
        if (e.target.tagName === "BUTTON") {
            console.log(jsonData, e.target.value)
            jsoncontent.innerHTML = ""
            const filterdata = jsonData.filter((item) => item.name !== e.target.value)
            renderData(filterdata)
            localStorage.setItem("jsonData", JSON.stringify(filterdata))
        }
    })
    themesSetting.addEventListener("click", (e) => {
        console.log(e.target.className)
        if (e.target.className === "dark-theme") {
            darktheme.style.display = "none"
            lighttheme.style.display = "block"
            body.style.backgroundColor = "white"
            header.style.backgroundColor = "white"
            header.style.border = "1px solid black"
            body.style.color = "black"
            let child = jsoncontent.children
            Array.from(child).forEach((apply) => {
                apply.style.backgroundColor = "white"
                apply.style.color = "black"
                apply.style.border = "1px solid black"
            })

        }
        if (e.target.className === "light-theme") {
            body.style.backgroundColor = "hsl(227, 75%, 14%)"
            header.style.backgroundColor = "hsl(227, 11%, 56%)"
            header.style.border = "none"
            body.style.color = "white"
            darktheme.style.display = "block"
            lighttheme.style.display = "none"
            let child = jsoncontent.children
            Array.from(child).forEach((apply) => {
                apply.style.backgroundColor = "hsl(226, 11%, 37%)"
                apply.style.color = "black"
                apply.style.border = "none"
            })
        }
    })
})
