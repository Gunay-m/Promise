// const fetch (){
//     return new Promise(resolve, reject)

// }
function fetchBlogs() {
  return new Promise((resolve, reject) => {
    fetch("blogs.json")
      .then((cavab) => {
        if (!cavab.ok) {
          throw new Error("Faylin oxunmasinda problem var");
        }
        return cavab.json();
      })
      .then(bloqlar=>{
        localStorage.setItem("bloqlarDepo",JSON.stringify(bloqlar))
        resolve(bloqlar)
      })
      .catch(xeta => reject(xeta))


  });
}


function getDataFromLocalStorage(){
    const blogs=localStorage.getItem("bloqlarDepo")
    return blogs? JSON.parse(blogs) : null
}

function displayBlog(blogsParametr){
    const blogYerlesheceyiDiv = document.querySelector(".blog-right-side ")


    blogYerlesheceyiDiv.innerHTML=""


    blogsParametr.forEach(birBlog=>{
        const divElementi=document.createElement("div")
        divElementi.classList.add( "blog")

        divElementi.innerHTML=`
        <span id="metadata">${birBlog.tarix}</span>
        <h3>${birBlog.title}</h3>
        <a href="" class="text-white text-decoration-none">Read the article <img src="./images/ag-ox.svg" alt=""></a>
        `
blogYerlesheceyiDiv.appendChild(divElementi)
    })


}

document.addEventListener("DOMContentLoaded",loadData)

function loadData(){
    const blogs=getDataFromLocalStorage()

    if(blogs){
        console.log("Bloqlar yuklenir...")
        displayBlog(blogs)

    }

    else{
        console.log("Bloglar localda yoxdu, getdik internete...")
        fetchBlogs()
        .then(sonMerheleBloglar=>displayBlog(sonMerheleBloglar))
        .catch(hata=>console.log("sereverde gozlenilmez xeta"))
    }
}
