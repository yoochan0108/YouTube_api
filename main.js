const frame = document.querySelector('section');
const api_key = 'AIzaSyBoPJP34_cHU3rfs3RDDuL-NPXBv01f608';
const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const pid = 'PLuPg_rytnr6k-sPrYGREjbXLMZzwE7-N-&si=c72x_0iZr-7tHUMA';
const num = 5;
const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
const tit_len = 30;
const desc_len = 180;

//이벤트 위임(event delegation)
//동적으로 생성되는 요소에 이벤트 연결이 불가, 이벤트 연결시점에는 해당 돔이 생성되지 않았기 떄문
//항상 있는 body요소에다가 이벤트를 위임을해서 추루 동적 dom이 생기면 이벤츠를 전달받도록 처리

window.addEventListener('click', (e) => {
	//e.currentTarget : 이벤트가 연결되어 있는 선택자를 반환
	//e.target : 실제화면상에서 이벤트가 발생한 요소를 반환
	if (e.target.nodeName === 'IMG') {
		console.log('You clicked pic');
	}
});

fetch(resultURL)
	.then((data) => data.json())
	.then((json) => {
		console.log(json.items);
		let tags = '';

		json.items.map((data) => {
			let desc = data.snippet.description;
			desc.length > desc_len ? (desc = desc.substr(0, desc_len) + '...') : desc;

			//날자값 가공
			let date = data.snippet.publishedAt.split('T')[0];
			date = date.split('-').join('.');

			tags += `
				<article>
					<h2>${
						data.snippet.title.length > tit_len
							? data.snippet.title.substr(0, tit_len) + '...'
							: data.snippet.title
					}</h2>
					<div class='txt'>
						<p>${desc}</p>
						<span>${date}</span>
					</div>
					<div class='pic'>
						<img src='${data.snippet.thumbnails.standard.url}' />
					</div>
				</article>
			`;
		});

		frame.innerHTML = tags;
	});
