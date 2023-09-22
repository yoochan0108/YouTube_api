const frame = document.querySelector('section');
const api_key = 'AIzaSyBoPJP34_cHU3rfs3RDDuL-NPXBv01f608';
const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const pid = 'PLuPg_rytnr6k-sPrYGREjbXLMZzwE7-N-&si=c72x_0iZr-7tHUMA';
const num = 5;
const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

fetch(resultURL)
	.then((data) => data.json())
	.then((json) => {
		console.log(json.items);
		let tags = '';

		json.items.map((data) => {
			tags += `
				<article>
					<h2>${data.snippet.title}</h2>
					<div class='txt'>
						<p>${data.snippet.description}</p>
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
