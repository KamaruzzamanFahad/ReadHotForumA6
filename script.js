async function dataLoad(url) {
    const res = await fetch(url);
    const data = await res.json();

    const continer = document.getElementById('continer');
    continer.textContent = '';

    const nodata = document.getElementById('nodata');
    const emptydiv = document.getElementById('emptydiv');

    if(data.message == 'No posts found!!!'){
        emptydiv.classList.remove("hidden");
        emptydiv.classList.add("flex");
        nodata.innerText = ' ' + ` " ${inputdata} "`;
    }else{
        emptydiv.classList.add("hidden");
        emptydiv.classList.remove("flex");
    }


    for (const item of data.posts) {

        const div = document.createElement('div');
        div.className = 'flex flex-col md:flex-row lg:flex-row xl:flex-row  gap-5 bg-[#F3F3F5] p-6 py-10 rounded-xl w-full';

        div.innerHTML = `

                         <div>
                            <div class="box w-16 h-16 rounded-xl bg-white relative flex justify-center items-center">
                                <img class="rounded-xl" src="${item.image}" alt="">
                                <div class="point h-4 w-4 ${item.isActive} rounded-full absolute top-[-5px] right-[-5px] "></div>
                            </div>
                        </div>
    
                        <div class="w-full">
                            <div class="flex gap-6">
                                <h4 class="font-bold text-[#000000d6] text-sm"># ${item.category} </h4>
                                <h4 class="font-bold text-[#000000d6] text-sm">Author : ${item.author.name}</h4>
                            </div>
                            <h1 class="text-xl font-bold text-black mt-2">${item.title}</h1>
                            <p class="mt-2 mb-5">${item.description}</p>
                            <hr style="border-top: 1px dashed rgba(0, 0, 0, 0.339);">
                            <div class="flex gap-6 mt-5 w-full">
                                <div class="flex gap-3">
                                    <img src="images/massage.png" alt="">
                                    <span>${item.comment_count}</span>
                                </div>
                                <div class="flex gap-3">
                                    <img src="images/eye.png" alt="">
                                    <span>1,${item.view_count}</span>
                                </div>
                                <div class="flex gap-3">
                                    <img src="images/clock.png" alt="">
                                    <span>${item.posted_time} min</span>
                                </div>

                                <img onclick="reded('${item.title.replace("Beginner's", 'begen')} divide ${item.view_count}')" class="ml-auto" src="images/email.png" alt="">
                               
                                
                            </div>
                        </div>
    

    `
        continer.appendChild(div);

    }
}

dataLoad("https://openapi.programming-hero.com/api/retro-forum/posts");

function reded(titleview) {
    console.log(titleview);

    const titleviews = titleview.split('divide');
    const title = titleviews[0].replace("begen", "Beginner's");
    const view = titleviews[1];
    const TitleConti = document.getElementById('TitleConti');
    const div = document.createElement('div');
    div.className = "bg-white rounded-xl p-4 flex justify-between items-center mt-3";

    div.innerHTML = `
                            <div>
                                <h1 class="font-bold">${title}</h1>
                            </div>

                            <div class="flex">
                                    <img src="images/eye.png" alt="">
                                    <span class="mr-5 ml-2">${view}</span>
                            </div>
    `
    TitleConti.appendChild(div);

    const totalread = document.getElementById('totalread');
    totalread.innerText = parseInt(totalread.innerText) + 1;
}


let uri = '';
let inputdata = '';
document.getElementById('Search').addEventListener('click', function () {
    const inputvalu = document.getElementById('inputsearch').value;
    console.log(inputvalu);
    inputdata = inputvalu;

    const loding = document.getElementById('looding');
    loding.classList.remove('hidden')
    loding.classList.add('flex');
    setTimeout(buttonclick, 2000);
 
    uri = "https://openapi.programming-hero.com/api/retro-forum/posts?category=" + inputvalu;
})

function buttonclick() {
    const loding = document.getElementById('looding');
    loding.classList.add('hidden')
    loding.classList.remove('flex');
    console.log(uri);
    dataLoad(uri);
}







async function latastPost() {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();

    const latastConti = document.getElementById('latastConti');

    for (const item of data) {
        console.log(item.title);
        const div = document.createElement('div');
        div.className = "p-5 border-2 border-[#00000015] rounded-3xl w-full";
        div.innerHTML = `
                    <div class="w-full h-44 bg-[#12132d12] rounded-3xl flex justify-center items-center bg-cover bg-center" style="background-image: url('${item.cover_image}')">
                    </div>

                    <div class="flex mt-4">
                        <img src="images/calander.png" alt="">
                        <span class="ml-2">${item.author?.posted_date ? item.author.posted_date: 'No Publish Date' }</span>
                    </div>
                    <h2 class="mt-4 text-xl text-black font-extrabold mb-4">${item.title}</h2>
                    <p>${item.description}</p>
                    <div class="flex mt-4 gap-3">
                        <img width="40px" class="rounded-full" src="${item.profile_image}" alt="">
                        <div>
                            <h4 class="font-bold">${item.author.name}</h4>
                            <span>${item.author?.designation ? item.author?.designation: 'Unknown'}</span>
                        </div>
                </div>
    `
        latastConti.appendChild(div);
    }
}
latastPost();