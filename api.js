
const api = ( () => {
    let index = 0;
    
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const move = (dir) => {
        async function inner(){
            const $ = document.getElementById("c");
            $.classList.remove("an-initial", "an-left", "an-right");
            $.classList.add("main-hidden");
            $.innerHTML = '';
            dir === 'back' ? index -=1 : dir === 'fwd' ? index +=1 : null
            await sleep(200)
            createContent();
            dir === 'back' ? $.classList.replace("main-hidden", "an-left") : dir === 'fwd' ? $.classList.replace("main-hidden", "an-right") : null
        }
        dir === 'back' && index-1 >= 0 ? inner(dir) : dir === 'fwd' && index+1 < data.slides.length ? inner(dir) : null
    }

    const moveSlideByKey = (e) => {
        e.code === 'ArrowLeft' ? move('back') : e.code === 'ArrowRight' ? move('fwd') : null
    }
    
    const moveSlideByClick = (e) => {
        e.target.id === 'l' ? move('back') : e.target.id === 'r' ? move('fwd') : null
    }

    const createContent = () => {
        const createContentText = () => {
            let content = `
            <p class="title">${data['slides'][index]['title']}</p>
            <p class="content">${data['slides'][index]['content']}</p>`
            return content;
        }
        const createContentImg = () => {
            let content = `
            <p class="title">${data['slides'][index]['title']}</p>
            <img class="content" src=${data['slides'][index]['content']}>`
            return content;
        }
        let content
        data['slides'][index]['content-type'] === 'text' ? content = createContentText() : data['slides'][index]['content-type'] === 'image' ? content = createContentImg() : null
        document.getElementById("c").innerHTML = content;
    }

    const initPresentation = () => {
        createContent()
        document.getElementById("c").classList.replace("main-hidden", "an-initial");
    }
    const attachEvents = () => document.onkeydown = moveSlideByKey; document.onclick = moveSlideByClick; initPresentation();
    
    return {
        init: () => attachEvents()
    };

})();
