const frame = document.querySelector('section');
const api_key = 'AIzaSyBoPJP34_cHU3rfs3RDDuL-NPXBv01f608';
const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const pid = 'PLuPg_rytnr6k-sPrYGREjbXLMZzwE7-N-&si=c72x_0iZr-7tHUMA';
const num = 5;
const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
const tit_len = 50;
const desc_len = 180;

//일정 글자수 이상일때 글짜자르고 말줄임표 붙이기
//문자열.substr(시작위치,자를 글자수)

fetch(resultURL)
	.then((data) => data.json())
	.then((json) => {
		console.log(json.items);
		let tags = '';

		json.items.map((data) => {
			let desc = data.snippet.description;
			desc.length > desc_len ? (desc = desc.substr(0, desc_len) + '...') : desc;
			tags += `
				<article>
					<h2>${
						data.snippet.title.length > tit_len
							? data.snippet.title.substr(0, tit_len) + '...'
							: data.snippet.title
					}</h2>
					<div class='txt'>
						<p>${desc}</p>
						<span>${data.snippet.publishedAt}</span>
					</div>
					<div class='pic'>
						<img src='${data.snippet.thumbnails.standard.url}' />
					</div>
				</article>
			`;
		});

		frame.innerHTML = tags;
	});
