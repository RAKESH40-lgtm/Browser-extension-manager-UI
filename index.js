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
    let themesType = "light-theme"

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
        input.setAttribute("value", data?.name)
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
    function cardthemes(themesType) {
        if (themesType === "dark-theme") {
            console.log(themesType)
            let child = jsoncontent.children
            Array.from(child).forEach((apply) => {
                apply.style.backgroundColor = "white"
                apply.style.color = "black"
                apply.style.border = "1px solid black"
            })
        } else {
            let child = jsoncontent.children
            Array.from(child).forEach((apply) => {
                apply.style.backgroundColor = "hsl(226, 11%, 37%)"
                apply.style.color = "white"
                apply.style.border = "none"
            })
        }
    }
    actionsBtns.addEventListener("click", (e) => {
        let jsonData = getItem()

        if (e.target.tagName === "BUTTON") {
            jsoncontent.innerHTML = ""

            if (e.target.textContent === "All") {
                e.target.style.backgroundColor = "hsl(3, 77%, 44%)"
                Array.from(actionsBtns.children).forEach((item) => {
                    if (item !== e.target) {
                        item.style.backgroundColor = "white"
                    }
                })
                renderData(jsonData)
                cardthemes(themesType)
            }
            if (e.target.textContent === "Active") {
                e.target.style.backgroundColor = "hsl(3, 77%, 44%)"
                Array.from(actionsBtns.children).forEach((item) => {
                    if (item !== e.target) {
                        item.style.backgroundColor = "white"
                    }
                })
                const filterActive = jsonData.filter((item) => item.isActive)
                console.log("active", filterActive)
                renderData(filterActive)
                cardthemes(themesType)
            }
            if (e.target.textContent === "Inactive") {
                e.target.style.backgroundColor = "hsl(3, 77%, 44%)"
                Array.from(actionsBtns.children).forEach((item) => {
                    if (item !== e.target) {
                        item.style.backgroundColor = "white"
                    }
                })
                const filterInActive = jsonData.filter((item) => !item.isActive)
                console.log("active", filterInActive)
                renderData(filterInActive)
                cardthemes(themesType)
            }
        }
    })
    jsoncontent.addEventListener("click", (e) => {
        let jsonData = getItem()
        if (e.target.tagName === "INPUT") {
            const findbyindex = jsonData.findIndex((item, index) => item.name == e.target.value)
            const finddata = jsonData.find((item, index) => item.name == e.target.value)
            console.log(finddata)
            finddata.isActive = !finddata.isActive
            jsonData.splice(findbyindex, 1, finddata)
            localStorage.setItem("jsonData", JSON.stringify(jsonData))
            console.log("Changed", jsonData)
            cardthemes(themesType)
        }
        if (e.target.tagName === "BUTTON") {
            jsoncontent.innerHTML = ""
            const filterdata = jsonData.filter((item) => item.name !== e.target.value)
            renderData(filterdata)
            cardthemes(themesType)
            localStorage.setItem("jsonData", JSON.stringify(filterdata))
        }
    })
    themesSetting.addEventListener("click", (e) => {
        themesType = e.target.className
        if (e.target.className === "dark-theme") {
            darktheme.style.display = "none"
            lighttheme.style.display = "block"
            body.style.backgroundColor = "white"
            header.style.backgroundColor = "white"
            themesSetting.style.backgroundColor = "white"
            header.style.border = "1px solid black"
            themesSetting.style.border = "1px solid black"
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
            themesSetting.style.backgroundColor = "hsl(227, 11%, 37%)"
            header.style.backgroundColor = "hsl(227, 11%, 56%)"
            header.style.border = "none"
            body.style.color = "white"
            darktheme.style.display = "block"
            lighttheme.style.display = "none"
            let child = jsoncontent.children
            Array.from(child).forEach((apply) => {
                apply.style.backgroundColor = "hsl(226, 11%, 37%)"
                apply.style.color = "white"
                apply.style.border = "none"
            })
        }
    })
})
