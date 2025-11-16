addEventListener("DOMContentLoaded",()=>{
    fetch("./data.json").then((res)=>{
       return  res.json()
    }).then((data)=>{
        localStorage.setItem("jsonData",JSON.stringify(data))
    })
    let jsonData=JSON.parse(localStorage.getItem("jsonData"))
    let jsoncontent=document.querySelector(".extension-content")
    console.log(jsonData[0])
    function renderList(data){
        let extensionList=document.createElement("div")
        extensionList.className="extensions-lists"
        let cardheader=document.createElement("extension-header")
        cardheader.className="extension-header"
        let cardImage=document.createElement("div")
        let listdetails=document.createElement("div")
        listdetails.className="extention-listdetails"
        let extensionfooter=document.createElement("div")
        extensionfooter.className="extension-footer"
        let extentionbtn=document.createElement("button")
        let label=document.createElement("label")
        label.className="switch"
        let input=document.createElement("input")
        input.setAttribute("type","checkbox")
        input.checked=data?.isActive
        let span=document.createElement("span")
        span.className="slider round"

        extentionbtn.className="extensionlistBtn"
        extentionbtn.textContent="Remove"

        
        let image=document.createElement("img")
        image.src=data?.logo
        cardImage.append(image)
        
        let p1=document.createElement("p")
        let p2=document.createElement("p")
        p1.textContent=data?.name

        p2.textContent=data?.description
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
    for(let i=0 ;i<jsonData.length ;i++){
        renderList(jsonData[i])
    }
})
