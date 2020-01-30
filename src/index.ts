import {Ratslider} from './ratslider'


function createBanner(selector:string,html:string){

	var target=document.querySelector(selector)

	target.innerHTML=html

new Ratslider({
					id:'#my-slider',
					slides:'.slide',
					dots:true,
					handlers:true,
					draggable:true,
					create:true
				},
				(element)=>{ //callback executed when current slider its in place.
					console.log('do something');
				}
	)


}

window.ratBanner=createBanner
