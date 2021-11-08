var form = document.getElementById("myForm");
var linkValue = document.getElementById("link-value");
var resultsContainer = document.getElementById("results-container");
var loader = document.getElementById("loader");
let resultsArray = [];
let loading = false;
let i = 0;
const shortnerURL="https://api.shrtco.de/v2/shorten"
async function  handleForm (event) { 
    event.preventDefault();
    loading=true;
    showLoader();
    await fetch(`${shortnerURL}?url=${linkValue.value}`)
    .then((res)=>res.json())
    .then(data => {
        loading=false;
        data = {
            original: data.result.original_link,
            link: data.result.full_short_link,
        }
        showLoader();
        appendData(data);
    })
    .catch((e)=>{
        loading=false;
        showLoader();
        console.log(e.message)
    })
}
form.addEventListener('submit', handleForm);
const appendData = (data) => {
    resultsArray.push(data);
    i=i+1;
    resultsArray
        .filter((existing) => existing == data)
        .forEach((item) => {
            let result = document.createElement("div");
            let linkText = document.createElement("p");
            let linkContainer = document.createElement("div");
            let link = document.createElement("a");
            let copyBtn = document.createElement("button");
            copyBtn.innerHTML = "Copy";
            copyBtn.className="copy-btn";
            copyBtn.id="copy";
            copyBtn.addEventListener('click', changeBtnText)
            linkText.innerHTML = item.original;
            linkText.className = "link-text";
            link.href=item.link;
            link.innerHTML=item.link;
            link.setAttribute('target','_blank');
            link.className = "link"
            linkContainer.appendChild(link);
            linkContainer.appendChild(copyBtn);
            linkContainer.className = "link-container"
            result.setAttribute('key', i);
            result.appendChild(linkText);
            result.appendChild(linkContainer);
            result.className="result";
            resultsContainer.appendChild(result);
        })
}

const showLoader = () =>{
    if (loading){
        loader.style.display="block"
    }
    else if (!loading){
        loader.style.display="none"
    }
}

const changeBtnText = () =>{
    document.getElementById("copy").innerHTML="Copied!";
}